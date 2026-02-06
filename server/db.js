const Database = require('better-sqlite3')
const path = require('path')

const dbPath = path.join(__dirname, '..', 'db', 'exam.db')
const db = new Database(dbPath)

db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')

db.exec(`
  CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    started_at TEXT NOT NULL DEFAULT (datetime('now')),
    finished_at TEXT,
    category_filter TEXT DEFAULT 'All',
    total_questions INTEGER NOT NULL,
    correct_count INTEGER DEFAULT 0,
    time_spent_seconds INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS answers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id INTEGER NOT NULL REFERENCES sessions(id),
    question_id INTEGER NOT NULL,
    question_order INTEGER NOT NULL,
    selected_answers TEXT NOT NULL,
    is_correct INTEGER NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_answers_session ON answers(session_id);
  CREATE INDEX IF NOT EXISTS idx_answers_question ON answers(question_id);
`)

module.exports = db
