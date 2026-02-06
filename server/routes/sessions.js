const { Router } = require('express')
const db = require('../db')

const router = Router()

router.post('/', (req, res) => {
  const { categoryFilter, totalQuestions } = req.body
  const result = db.prepare(
    'INSERT INTO sessions (category_filter, total_questions) VALUES (?, ?)'
  ).run(categoryFilter || 'All', totalQuestions)
  res.json({ id: result.lastInsertRowid })
})

router.get('/', (req, res) => {
  const sessions = db.prepare(
    'SELECT * FROM sessions ORDER BY started_at DESC'
  ).all()
  res.json(sessions)
})

router.get('/:id', (req, res) => {
  const session = db.prepare('SELECT * FROM sessions WHERE id = ?').get(req.params.id)
  if (!session) return res.status(404).json({ error: 'Session not found' })

  const answers = db.prepare(
    'SELECT * FROM answers WHERE session_id = ? ORDER BY question_order'
  ).all(req.params.id)

  res.json({ ...session, answers })
})

router.post('/:id/finish', (req, res) => {
  const { correctCount, timeSpentSeconds } = req.body
  db.prepare(
    `UPDATE sessions SET finished_at = datetime('now'), correct_count = ?, time_spent_seconds = ? WHERE id = ?`
  ).run(correctCount, timeSpentSeconds, req.params.id)
  res.json({ ok: true })
})

module.exports = router
