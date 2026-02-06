# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Adobe Commerce Architect Exam Prep (AD0-E722) — interactive quiz with 121 questions across 25+ categories.

## Architecture

Single self-contained HTML file (`adobe-commerce-quiz.html`, ~7000 lines). No build tools, no backend, no package manager.

**Stack:** React 18 + Babel (in-browser JSX transpilation) + inline CSS-in-JS styles
**CDN deps:** react@18, react-dom@18, @babel/standalone, lucide icons
**Rendering:** `ReactDOM.render(<App />, document.getElementById('root'))`

### File Structure

| File | Purpose |
|------|---------|
| `adobe-commerce-quiz.html` | Entire application — data, components, styles |
| `QUESTIONS_PLAN.md` | Roadmap for question expansion (batches 1-8) |
| `Feedback-*.pdf/.png` | Exam feedback reference materials |

### HTML Structure (adobe-commerce-quiz.html)

| Lines | Content |
|-------|---------|
| 1-17 | HTML head, CDN scripts, base CSS |
| 22-36 | SVG icon components (ChevronRight, Check, X, etc.) |
| 39-6730 | `quizQuestions` array — all 121 question objects |
| 6731-6818 | `styles` object — all CSS-in-JS styling |
| 6820-7060 | `App()` component — quiz logic and rendering |
| 7062 | ReactDOM.render entry point |

### Question Data Schema

```javascript
{
  id: Number,                    // Sequential ID (1-121)
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

### Categories (25+)

Dependency Injection, Service Contracts, GraphQL, Web API, Message Queue, Adobe Commerce Cloud, Caching, Performance, Security, Testing, Configuration & XML, EAV & Attributes, Indexing, Session & Architecture, Deployment & Cloud, Plugins & DI, Multi-Store, Database, Events & Observers, Code Architecture, JavaScript & Frontend, Checkout & Orders, Order Management, Payment Integration, Shipping, API & Web Services, Cron & Scheduling, Import & Export, Elasticsearch, Admin Customization, Extension Attributes, B2B Features, MSI (Inventory), Logging & Debugging, Theme Development, Catalog Rules, Module Development

### App State

```
currentQuestion, selectedAnswers, showResult, quizCompleted, score, categoryFilter, filteredQuestions, answeredQuestions
```

### Features

- Category filtering via dropdown
- Shuffle questions (random sort)
- Previous/Next navigation
- Check answer → show explanation + code example
- Score tracking with results screen
- Reset quiz

## Running

Open `adobe-commerce-quiz.html` in any modern browser. No server needed.

## Adding Questions

1. Add question object to `quizQuestions` array (maintain sequential `id`)
2. Follow existing schema exactly — `correctAnswers` is always an array
3. Match category names to existing categories when possible
4. Include `explanation` with "why correct" and "why others wrong"
5. Include `codeExample` when relevant (PHP/SQL/XML)
6. Update `QUESTIONS_PLAN.md` to track progress
