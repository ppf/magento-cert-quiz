import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(password)
      navigate('/', { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-surface-900 flex items-center justify-center px-4">
      <div
        className="w-full max-w-sm rounded-xl border border-white/[0.06] p-8"
        style={{
          background: 'linear-gradient(145deg, rgba(30,41,59,0.5) 0%, rgba(26,26,46,0.6) 100%)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
            style={{ background: 'linear-gradient(135deg, #f97316, #fbbf24)' }}
          >
            <span className="text-lg font-bold text-surface-900">E7</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">AD0-E722 Exam Prep</h1>
          <p className="text-sm text-slate-400 mt-1">Enter your password to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoFocus
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white placeholder-slate-500 text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/25 transition-colors"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3 rounded-lg text-sm font-semibold text-surface-900 transition-all duration-200 hover:brightness-110 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: 'linear-gradient(135deg, #f97316, #fbbf24)' }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
