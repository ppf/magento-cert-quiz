# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Adobe Commerce Architect Exam Prep (AD0-E722) — interactive quiz platform.

## Architecture

React 18 + Vite frontend, Express.js backend, SQLite persistence.

- **Frontend:** React 18 + Vite + Tailwind CSS + react-router-dom v7
- **Backend:** Express.js 5 (PORT 3001)
- **Database:** SQLite3 (better-sqlite3, WAL mode)
- **Questions:** `server/data/questions.json` (single source of truth)
- **Run:** `npm run dev` (concurrently starts server + client)

## File Structure

```
cert/
├── package.json                  # Root: concurrently runs server + client
├── QUESTIONS_PLAN.md             # Question expansion roadmap (batches 1-8, complete)
├── Feedback-*.pdf/.png           # Exam feedback reference materials
│
├── server/
│   ├── index.js                  # Express entry (PORT 3001, CORS enabled)
│   ├── db.js                     # SQLite setup: sessions + answers tables
│   ├── routes/
│   │   ├── questions.js          # GET /api/questions(?category=X)
│   │   ├── sessions.js           # POST/GET /api/sessions, POST /:id/finish
│   │   ├── answers.js            # POST /api/answers
│   │   └── stats.js              # GET /api/stats (aggregations)
│   └── data/
│       └── questions.json        # 121 questions (single source of truth)
│
├── client/
│   ├── package.json              # React, Vite, Tailwind, lucide-react, react-router-dom
│   ├── vite.config.js            # Proxy /api → localhost:3001
│   ├── tailwind.config.js        # Custom theme: surface/accent colors, DM Sans + JetBrains Mono
│   ├── index.html                # Entry: <div id="root">
│   ├── src/
│   │   ├── main.jsx              # ReactDOM.createRoot + BrowserRouter
│   │   ├── App.jsx               # Routes: /, /quiz, /results/:id
│   │   ├── index.css             # Tailwind + custom animations
│   │   ├── api.js                # Fetch wrapper: get/post → /api/*
│   │   ├── hooks/
│   │   │   ├── useQuiz.js        # Quiz state: answers, score, navigation
│   │   │   └── useTimer.js       # Elapsed time tracking
│   │   ├── pages/
│   │   │   ├── DashboardPage.jsx # Stats overview + weak areas + session history
│   │   │   ├── QuizPage.jsx      # Category select + quiz flow
│   │   │   └── ResultsPage.jsx   # Score + per-question review
│   │   └── components/
│   │       ├── Layout.jsx        # Nav + main wrapper (Outlet)
│   │       ├── QuestionCard.jsx  # Question + options + explanation
│   │       └── ProgressBar.jsp   # Linear progress indicator
│   └── dist/                     # Built output (vite build)
│
└── db/
    └── exam.db                   # SQLite database (sessions + answers)
```

## Question Data Schema

```javascript
{
  id: Number,                    // Sequential ID
  category: String,              // e.g. "Dependency Injection", "GraphQL"
  difficulty: "Medium" | "Hard",
  question: String,              // Question text (may contain backticks/code)
  options: [{ id: "A"|"B"|..., text: String }],
  correctAnswers: String[],      // ["A"] or ["B","C"] for multi-select
  explanation: String,           // Detailed explanation with reasoning
  codeExample: String            // Optional PHP/SQL/XML code snippet
}
```

Multi-select questions: `correctAnswers.length > 1` — UI auto-detects and shows checkboxes vs radio.

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/questions(?category=X)` | All/filtered questions |
| POST | `/api/sessions` | Create session `{categoryFilter, totalQuestions}` |
| GET | `/api/sessions` | List all sessions |
| GET | `/api/sessions/:id` | Session + all answers |
| POST | `/api/sessions/:id/finish` | Complete session `{correctCount, timeSpentSeconds}` |
| POST | `/api/answers` | Record answer `{sessionId, questionId, questionOrder, selectedAnswers, isCorrect}` |
| GET | `/api/stats` | Overview, per-question, per-category aggregations |

## Database Schema (SQLite)

```sql
sessions (id, started_at, finished_at, category_filter, total_questions, correct_count, time_spent_seconds)
answers (id, session_id→sessions, question_id, question_order, selected_answers, is_correct)
-- Indexes: idx_answers_session, idx_answers_question
```

## Data Flow

```
Browser (Vite :5173) → Proxy /api → Express (:3001) → SQLite (db/exam.db)
                                                     → questions.json (read-only)
```

## Running

```bash
npm install && cd client && npm install && cd ..
npm run dev          # Starts server (3001) + client (5173) concurrently
```

## Adding Questions

1. Add to `server/data/questions.json` (single source of truth, maintain sequential `id`)
2. Follow schema exactly — `correctAnswers` is always an array
3. Match category names to existing categories when possible
4. Include `explanation` with "why correct" and "why others wrong"
5. Include `codeExample` when relevant (PHP/SQL/XML)
