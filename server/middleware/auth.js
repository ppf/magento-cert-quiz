const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const QUIZ_PASSWORD = process.env.QUIZ_PASSWORD
if (!QUIZ_PASSWORD) {
  console.error('QUIZ_PASSWORD environment variable is required')
  process.exit(1)
}

const JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex')
const JWT_EXPIRY = '7d'

// Simple in-memory rate limiter for login attempts
const loginAttempts = new Map()
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 5

function cleanupAttempts() {
  const now = Date.now()
  for (const [ip, data] of loginAttempts) {
    if (now - data.windowStart > RATE_LIMIT_WINDOW_MS) {
      loginAttempts.delete(ip)
    }
  }
}

setInterval(cleanupAttempts, RATE_LIMIT_WINDOW_MS)

function checkRateLimit(ip) {
  const now = Date.now()
  const data = loginAttempts.get(ip)
  if (!data || now - data.windowStart > RATE_LIMIT_WINDOW_MS) {
    loginAttempts.set(ip, { windowStart: now, count: 1 })
    return true
  }
  data.count++
  return data.count <= RATE_LIMIT_MAX
}

function loginHandler(req, res) {
  const ip = req.ip || req.connection.remoteAddress
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: 'Too many login attempts. Try again in a minute.' })
  }

  const { password } = req.body || {}
  if (!password || typeof password !== 'string') {
    return res.status(400).json({ error: 'Password is required' })
  }

  const passwordBuffer = Buffer.from(password)
  const secretBuffer = Buffer.from(QUIZ_PASSWORD)

  if (passwordBuffer.length !== secretBuffer.length ||
      !crypto.timingSafeEqual(passwordBuffer, secretBuffer)) {
    return res.status(401).json({ error: 'Invalid password' })
  }

  const token = jwt.sign({ user: 'admin' }, JWT_SECRET, { expiresIn: JWT_EXPIRY })
  res.json({ token })
}

function requireAuth(req, res, next) {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required' })
  }

  const token = header.slice(7)
  try {
    jwt.verify(token, JWT_SECRET)
    next()
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}

module.exports = { loginHandler, requireAuth }
