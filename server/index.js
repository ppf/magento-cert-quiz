const express = require('express')
const cors = require('cors')
const questionsRouter = require('./routes/questions')
const sessionsRouter = require('./routes/sessions')
const answersRouter = require('./routes/answers')
const statsRouter = require('./routes/stats')

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

app.use('/api/questions', questionsRouter)
app.use('/api/sessions', sessionsRouter)
app.use('/api/answers', answersRouter)
app.use('/api/stats', statsRouter)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
