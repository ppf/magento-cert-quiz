const { Router } = require('express')
const path = require('path')

const router = Router()
const questions = require(path.join(__dirname, '..', 'data', 'questions.json'))

router.get('/', (req, res) => {
  const { category } = req.query
  if (category && category !== 'All') {
    return res.json(questions.filter(q => q.category === category))
  }
  res.json(questions)
})

module.exports = router
