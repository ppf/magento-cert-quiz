import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Trophy, Clock, Target, TrendingUp,
  ChevronRight, BarChart3, Play,
} from 'lucide-react'
import api from '../api'

function GlassCard({ children, className = '', onClick }) {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl border border-white/[0.06] p-5 ${onClick ? 'cursor-pointer hover:border-white/[0.12] transition-colors' : ''} ${className}`}
      style={{
        background: 'linear-gradient(145deg, rgba(30,41,59,0.5) 0%, rgba(26,26,46,0.6) 100%)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {children}
    </div>
  )
}

function StatCard({ icon: Icon, value, label, color }) {
  return (
    <GlassCard>
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
          <Icon size={20} />
        </div>
      </div>
      <div className="text-3xl font-bold text-white tracking-tight">{value}</div>
      <div className="text-sm text-slate-400 mt-1">{label}</div>
    </GlassCard>
  )
}

function AccuracyBar({ accuracy }) {
  const pct = Math.round(accuracy)
  let barColor = 'bg-red-500'
  if (pct >= 70) barColor = 'bg-emerald-500'
  else if (pct >= 50) barColor = 'bg-amber-400'

  return (
    <div className="flex items-center gap-3 flex-1 min-w-0">
      <div className="flex-1 h-2 rounded-full bg-white/[0.06] overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-sm font-mono text-slate-300 w-12 text-right">{pct}%</span>
    </div>
  )
}

function formatDuration(seconds) {
  if (!seconds) return '--'
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return m > 0 ? `${m}m ${s}s` : `${s}s`
}

function formatDate(dateStr) {
  const d = new Date(dateStr)
  const now = new Date()
  const diffMs = now - d
  const diffHours = diffMs / (1000 * 60 * 60)

  if (diffHours < 1) return 'Just now'
  if (diffHours < 24) return `${Math.floor(diffHours)}h ago`
  if (diffHours < 48) return 'Yesterday'

  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default function DashboardPage() {
  const [stats, setStats] = useState(null)
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    Promise.all([
      api.get('/api/stats'),
      api.get('/api/sessions'),
    ]).then(([statsData, sessionsData]) => {
      setStats(statsData)
      setSessions(sessionsData)
    }).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
      </div>
    )
  }

  const overview = stats?.overview ?? {}
  const totalSessions = overview.totalSessions ?? 0
  const totalAnswered = overview.totalAnswered ?? 0
  const totalCorrect = overview.totalCorrect ?? 0
  const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0
  const avgScore = overview.avgScore ?? 0

  const weakAreas = (stats?.categories ?? [])
    .filter(c => c.attempts > 0)
    .map(c => ({ ...c, accuracy: c.attempts > 0 ? (c.correct / c.attempts) * 100 : 0 }))
    .sort((a, b) => a.accuracy - b.accuracy)

  const recentSessions = sessions.filter(s => s.finished_at).slice(0, 10)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">Track your exam preparation progress</p>
        </div>
        <button
          onClick={() => navigate('/quiz')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-surface-900 transition-all duration-200 hover:brightness-110 active:scale-[0.97]"
          style={{ background: 'linear-gradient(135deg, #f97316, #fbbf24)' }}
        >
          <Play size={16} />
          Start Quiz
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={BarChart3}
          value={totalSessions}
          label="Sessions"
          color="bg-accent/15 text-accent-light"
        />
        <StatCard
          icon={Target}
          value={totalAnswered}
          label="Questions Answered"
          color="bg-sky-500/15 text-sky-400"
        />
        <StatCard
          icon={Trophy}
          value={`${accuracy}%`}
          label="Overall Accuracy"
          color="bg-emerald-500/15 text-emerald-400"
        />
        <StatCard
          icon={TrendingUp}
          value={`${Math.round(avgScore)}%`}
          label="Avg Score"
          color="bg-violet-500/15 text-violet-400"
        />
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Weak Areas */}
        <div className="lg:col-span-3">
          <GlassCard>
            <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
              <Target size={18} className="text-accent" />
              Weak Areas
            </h2>
            {weakAreas.length === 0 ? (
              <p className="text-sm text-slate-500 py-6 text-center">
                Complete a quiz to see weak areas
              </p>
            ) : (
              <div className="space-y-3">
                {weakAreas.map((cat) => (
                  <div key={cat.category} className="flex items-center gap-4">
                    <span className="text-sm text-slate-300 w-44 truncate shrink-0" title={cat.category}>
                      {cat.category}
                    </span>
                    <AccuracyBar accuracy={cat.accuracy} />
                    <span className="text-xs text-slate-500 w-16 text-right shrink-0">
                      {cat.attempts} tried
                    </span>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>
        </div>

        {/* Recent Sessions */}
        <div className="lg:col-span-2">
          <GlassCard>
            <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
              <Clock size={18} className="text-accent" />
              Recent Sessions
            </h2>
            {recentSessions.length === 0 ? (
              <p className="text-sm text-slate-500 py-6 text-center">
                No sessions yet -- start a quiz!
              </p>
            ) : (
              <div className="space-y-2">
                {recentSessions.map((s) => {
                  const pct = s.total_questions > 0 ? Math.round((s.correct_count / s.total_questions) * 100) : 0
                  return (
                    <div
                      key={s.id}
                      onClick={() => navigate(`/results/${s.id}`)}
                      className="flex items-center gap-3 p-3 -mx-2 rounded-lg cursor-pointer hover:bg-white/[0.04] transition-colors group"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-white">
                            {s.correct_count}/{s.total_questions}
                          </span>
                          <span className={`text-xs font-mono ${pct >= 68 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {pct}%
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                          <span>{formatDate(s.started_at)}</span>
                          {s.category_filter && (
                            <>
                              <span>-</span>
                              <span className="truncate">{s.category_filter}</span>
                            </>
                          )}
                          {s.time_spent_seconds > 0 && (
                            <>
                              <span>-</span>
                              <span>{formatDuration(s.time_spent_seconds)}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-slate-600 group-hover:text-slate-400 transition-colors shrink-0" />
                    </div>
                  )
                })}
              </div>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
