# Adobe Commerce Architect Exam Prep (AD0-E722)

Interactive quiz app with 210 questions across 46 categories for Adobe Commerce Architect certification prep.

## Features

- **Quiz sessions** with exam-domain and category filtering, shuffle, timer, and answer persistence
- **Dashboard** with stats overview, weak area analysis, and session history
- **Results review** with per-question breakdown, explanations, and code examples
- **Progress tracking** via SQLite — tracks accuracy per question, category, and exam domain over time

## Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18 + Vite + Tailwind CSS |
| Backend | Express + better-sqlite3 |
| Data | 210 questions in JSON, SQLite for sessions/answers |

## Setup

```bash
npm install
cd client && npm install && cd ..
npm run dev
```

Opens at [http://localhost:5173](http://localhost:5173). API runs on port 3001 (proxied by Vite).

## Project Structure

```
cert/
├── server/
│   ├── index.js              # Express entry
│   ├── db.js                 # SQLite schema + connection
│   ├── routes/               # questions, sessions, answers, stats
│   └── data/questions.json   # 210 exam questions
├── client/
│   └── src/
│       ├── pages/            # Dashboard, Quiz, Results
│       ├── components/       # Layout, QuestionCard, ProgressBar
│       └── hooks/            # useQuiz, useTimer
└── db/                       # SQLite file (gitignored)
```

## Adding Questions

Add question objects to `server/data/questions.json` following the schema:

```json
{
  "id": 211,
  "category": "GraphQL",
  "examDomain": "Design",
  "objectiveTags": ["graphql", "resolver-patterns"],
  "difficulty": "Medium",
  "question": "Your question text",
  "options": [{ "id": "A", "text": "Option A" }],
  "correctAnswers": ["A"],
  "explanation": "Why A is correct...",
  "codeExample": "// optional code"
}
```
