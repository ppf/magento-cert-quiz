const express = require('express')
const cors = require('cors')
const path = require('path')
const { loginHandler, requireAuth } = require('./middleware/auth')
const questionsRouter = require('./routes/questions')
const sessionsRouter = require('./routes/sessions')
const answersRouter = require('./routes/answers')
const statsRouter = require('./routes/stats')

const app = express()
const PORT = process.env.PORT || 3001
const isProduction = process.env.NODE_ENV === 'production'

// CORS: only needed in dev (in production, frontend is served from same origin)
if (!isProduction) {
  app.use(cors())
}

app.use(express.json())

// Login route (unprotected)
app.post('/api/login', loginHandler)

// Auth middleware for all other API routes
app.use('/api', requireAuth)

app.use('/api/questions', questionsRouter)
app.use('/api/sessions', sessionsRouter)
app.use('/api/answers', answersRouter)
app.use('/api/stats', statsRouter)

// Production: serve built frontend
const distPath = path.join(__dirname, '..', 'client', 'dist')
app.use(express.static(distPath))
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'))
})

// Error handler — don't leak stack traces in production
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({
    error: isProduction ? 'Internal server error' : err.message
  })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
