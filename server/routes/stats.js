const { Router } = require('express')
const db = require('../db')
const path = require('path')

const router = Router()
const questions = require(path.join(__dirname, '..', 'data', 'questions.json'))

router.get('/', (req, res) => {
  const totalSessions = db.prepare('SELECT COUNT(*) as count FROM sessions WHERE finished_at IS NOT NULL').get().count
  const totalAnswered = db.prepare('SELECT COUNT(*) as count FROM answers').get().count
  const totalCorrect = db.prepare('SELECT COUNT(*) as count FROM answers WHERE is_correct = 1').get().count

  const avgScore = totalSessions > 0
    ? db.prepare('SELECT AVG(correct_count * 100.0 / total_questions) as avg FROM sessions WHERE finished_at IS NOT NULL').get().avg
    : 0

  const questionStats = db.prepare(`
    SELECT question_id,
           COUNT(*) as attempts,
           SUM(is_correct) as correct
    FROM answers
    GROUP BY question_id
  `).all()

  const questionMap = {}
  for (const q of questions) {
    questionMap[q.id] = { id: q.id, category: q.category, question: q.question, attempts: 0, correct: 0 }
  }
  for (const s of questionStats) {
    if (questionMap[s.question_id]) {
      questionMap[s.question_id].attempts = s.attempts
      questionMap[s.question_id].correct = s.correct
    }
  }

  const categoryStats = {}
  for (const q of Object.values(questionMap)) {
    if (!categoryStats[q.category]) {
      categoryStats[q.category] = { category: q.category, attempts: 0, correct: 0 }
    }
    categoryStats[q.category].attempts += q.attempts
    categoryStats[q.category].correct += q.correct
  }

  res.json({
    overview: {
      totalSessions,
      totalAnswered,
      totalCorrect,
      avgScore: Math.round(avgScore * 10) / 10,
    },
    questions: Object.values(questionMap),
    categories: Object.values(categoryStats),
  })
})

module.exports = router
