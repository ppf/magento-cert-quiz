const { Router } = require('express')
const db = require('../db')

const router = Router()

router.post('/', (req, res) => {
  const { sessionId, questionId, questionOrder, selectedAnswers, isCorrect } = req.body
  db.prepare(
    'INSERT INTO answers (session_id, question_id, question_order, selected_answers, is_correct) VALUES (?, ?, ?, ?, ?)'
  ).run(sessionId, questionId, questionOrder, JSON.stringify(selectedAnswers), isCorrect ? 1 : 0)
  res.json({ ok: true })
})

module.exports = router
