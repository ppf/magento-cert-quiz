const { Router } = require('express')
const path = require('path')

const router = Router()
const questions = require(path.join(__dirname, '..', 'data', 'questions.json'))

router.get('/', (req, res) => {
  const { category, examDomain } = req.query

  let filtered = questions

  if (category && category !== 'All') {
    filtered = filtered.filter((q) => q.category === category)
  }

  if (examDomain && examDomain !== 'All') {
    filtered = filtered.filter((q) => q.examDomain === examDomain)
  }

  res.json(filtered)
})

module.exports = router
