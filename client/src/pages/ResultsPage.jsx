import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Trophy, Clock, ArrowLeft, Play,
  CheckCircle, XCircle, ChevronRight,
} from 'lucide-react'
import api from '../api'

function formatDuration(seconds) {
  if (!seconds) return '--'
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return m > 0 ? `${m}m ${s}s` : `${s}s`
}

export default function ResultsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [session, setSession] = useState(null)
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState({})

  useEffect(() => {
    Promise.all([
      api.get(`/api/sessions/${id}`),
      api.get('/api/questions'),
    ]).then(([sessionData, questionsData]) => {
      setSession(sessionData)
      setQuestions(questionsData)
    }).finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
      </div>
    )
  }

  if (!session) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400">Session not found</p>
        <button onClick={() => navigate('/')} className="text-accent mt-4 text-sm hover:underline">
          Back to Dashboard
        </button>
      </div>
    )
  }

  const score = session.correct_count
  const totalQuestions = session.total_questions
  const timeSpent = session.time_spent_seconds
  const categoryFilter = session.category_filter
  const answers = session.answers || []
  const pct = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0
  const passed = pct >= 68

  const questionsById = {}
  questions.forEach(q => { questionsById[q.id] = q })

  const toggleExpand = (idx) => {
    setExpanded(prev => ({ ...prev, [idx]: !prev[idx] }))
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Score Summary */}
      <div
        className="rounded-xl border border-white/[0.06] p-8 relative overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, rgba(30,41,59,0.5) 0%, rgba(26,26,46,0.6) 100%)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Decorative gradient orb */}
        <div
          className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-[0.07] pointer-events-none"
          style={{ background: passed ? 'radial-gradient(circle, #10b981, transparent)' : 'radial-gradient(circle, #ef4444, transparent)' }}
        />

        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${passed ? 'bg-emerald-500/15' : 'bg-red-500/15'}`}>
                <Trophy size={24} className={passed ? 'text-emerald-400' : 'text-red-400'} />
              </div>
              <div>
                <div className="text-4xl font-bold text-white tracking-tight">
                  {score}<span className="text-xl text-slate-500">/{totalQuestions}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                passed ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'
              }`}>
                {pct}% - {passed ? 'PASS' : 'FAIL'}
              </span>

              {timeSpent > 0 && (
                <span className="flex items-center gap-1.5 text-sm text-slate-400">
                  <Clock size={14} />
                  {formatDuration(timeSpent)}
                </span>
              )}

              {categoryFilter && (
                <span className="text-sm text-slate-500">
                  {categoryFilter}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-3 shrink-0">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-300 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.06] transition-colors"
            >
              <ArrowLeft size={16} />
              Dashboard
            </button>
            <button
              onClick={() => navigate('/quiz')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-surface-900 transition-all hover:brightness-110"
              style={{ background: 'linear-gradient(135deg, #f97316, #fbbf24)' }}
            >
              <Play size={16} />
              New Quiz
            </button>
          </div>
        </div>
      </div>

      {/* Per-Question Review */}
      <div>
        <h2 className="text-base font-semibold text-white mb-4">Question Review</h2>
        <div className="space-y-2">
          {answers.map((ans, idx) => {
            const q = questionsById[ans.question_id]
            const isCorrect = ans.is_correct
            const isOpen = expanded[idx]

            return (
              <div
                key={idx}
                className="rounded-xl border border-white/[0.06] overflow-hidden transition-colors"
                style={{
                  background: 'linear-gradient(145deg, rgba(30,41,59,0.35) 0%, rgba(26,26,46,0.45) 100%)',
                }}
              >
                {/* Collapsed row */}
                <button
                  onClick={() => toggleExpand(idx)}
                  className="w-full flex items-center gap-3 p-4 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-xs font-mono text-slate-500 w-8 shrink-0">
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  {isCorrect ? (
                    <CheckCircle size={18} className="text-emerald-400 shrink-0" />
                  ) : (
                    <XCircle size={18} className="text-red-400 shrink-0" />
                  )}

                  <span className="flex-1 text-sm text-slate-300 truncate">
                    {q ? q.question : `Question #${ans.question_id}`}
                  </span>

                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                    isCorrect ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {isCorrect ? 'Correct' : 'Incorrect'}
                  </span>

                  <ChevronRight
                    size={16}
                    className={`text-slate-600 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-90' : ''}`}
                  />
                </button>

                {/* Expanded detail */}
                {isOpen && q && (
                  <div className="px-4 pb-4 pt-0 border-t border-white/[0.04]">
                    <div className="pt-4 space-y-4">
                      <p className="text-sm text-slate-300 leading-relaxed">{q.question}</p>

                      {!isCorrect && (
                        <div className="flex gap-6 text-sm">
                          <div>
                            <span className="text-slate-500 text-xs uppercase tracking-wider">Your answer</span>
                            <p className="text-red-400 font-mono mt-1">
                              {(JSON.parse(ans.selected_answers || '[]')).join(', ') || '--'}
                            </p>
                          </div>
                          <div>
                            <span className="text-slate-500 text-xs uppercase tracking-wider">Correct</span>
                            <p className="text-emerald-400 font-mono mt-1">
                              {(q.correctAnswers || []).join(', ')}
                            </p>
                          </div>
                        </div>
                      )}

                      {q.explanation && (
                        <div className="text-sm text-slate-400 leading-relaxed bg-white/[0.02] rounded-lg p-4 border border-white/[0.04]">
                          {q.explanation}
                        </div>
                      )}

                      {q.codeExample && (
                        <pre className="text-xs bg-surface-900/80 rounded-lg p-4 border border-white/[0.06] overflow-x-auto">
                          <code className="text-slate-300">{q.codeExample}</code>
                        </pre>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
