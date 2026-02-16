const fs = require('fs')
const path = require('path')

const questionsPath = path.join(__dirname, '..', 'server', 'data', 'questions.json')
const questions = JSON.parse(fs.readFileSync(questionsPath, 'utf8'))

const validDomains = new Set(['Design', 'Review', 'ConfigureDeploy'])
const requiredFields = [
  'id',
  'category',
  'difficulty',
  'examDomain',
  'objectiveTags',
  'question',
  'options',
  'correctAnswers',
  'explanation'
]

const errors = []
const ids = new Set()
const domainCounts = { Design: 0, Review: 0, ConfigureDeploy: 0 }

for (const q of questions) {
  for (const field of requiredFields) {
    if (!(field in q)) {
      errors.push(`Q${q.id ?? 'unknown'} missing field: ${field}`)
    }
  }

  if (typeof q.id !== 'number') {
    errors.push(`Question with invalid id type: ${JSON.stringify(q.id)}`)
  } else if (ids.has(q.id)) {
    errors.push(`Duplicate id: ${q.id}`)
  } else {
    ids.add(q.id)
  }

  if (!validDomains.has(q.examDomain)) {
    errors.push(`Q${q.id}: invalid examDomain '${q.examDomain}'`)
  } else {
    domainCounts[q.examDomain] += 1
  }

  if (!Array.isArray(q.objectiveTags) || q.objectiveTags.length === 0) {
    errors.push(`Q${q.id}: objectiveTags must be a non-empty array`)
  } else {
    for (const tag of q.objectiveTags) {
      if (typeof tag !== 'string' || tag.trim() === '') {
        errors.push(`Q${q.id}: objectiveTags contains invalid value '${String(tag)}'`)
      }
    }
  }

  if (!Array.isArray(q.options) || q.options.length < 2) {
    errors.push(`Q${q.id}: options must be an array with at least 2 items`)
  } else {
    const optionIds = new Set()
    for (const option of q.options) {
      if (typeof option.id !== 'string' || typeof option.text !== 'string') {
        errors.push(`Q${q.id}: invalid option structure`) 
        continue
      }
      if (optionIds.has(option.id)) {
        errors.push(`Q${q.id}: duplicate option id '${option.id}'`)
      }
      optionIds.add(option.id)
    }

    if (!Array.isArray(q.correctAnswers) || q.correctAnswers.length === 0) {
      errors.push(`Q${q.id}: correctAnswers must be a non-empty array`)
    } else {
      for (const answerId of q.correctAnswers) {
        if (!optionIds.has(answerId)) {
          errors.push(`Q${q.id}: correct answer '${answerId}' not found in options`)
        }
      }
    }
  }

  if (q.difficulty !== 'Medium' && q.difficulty !== 'Hard') {
    errors.push(`Q${q.id}: invalid difficulty '${q.difficulty}'`)
  }

  if (typeof q.question !== 'string' || q.question.trim() === '') {
    errors.push(`Q${q.id}: question must be non-empty string`)
  }

  if (typeof q.explanation !== 'string' || q.explanation.trim() === '') {
    errors.push(`Q${q.id}: explanation must be non-empty string`)
  }
}

if (questions.length > 0) {
  const sortedIds = [...ids].sort((a, b) => a - b)
  if (sortedIds[0] !== 1 || sortedIds[sortedIds.length - 1] !== questions.length) {
    errors.push(`IDs are not contiguous 1..${questions.length}`)
  }
}

if (errors.length > 0) {
  console.error('Question validation failed:')
  for (const err of errors) console.error(`- ${err}`)
  process.exit(1)
}

console.log('Question validation passed.')
console.log(`Total questions: ${questions.length}`)
console.log('Domain counts:', domainCounts)
