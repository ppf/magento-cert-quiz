import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Play, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/quiz', label: 'Quiz', icon: Play },
]

export default function Layout() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-surface-900">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06]"
        style={{
          background: 'linear-gradient(135deg, rgba(26,26,46,0.92) 0%, rgba(15,15,26,0.96) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #f97316, #fbbf24)' }}
            >
              <span className="text-sm font-bold text-surface-900">E7</span>
            </div>
            <span className="text-lg font-semibold tracking-tight text-white">
              AD0-E722 <span className="text-slate-400 font-normal hidden sm:inline">Exam Prep</span>
            </span>
          </div>

          <div className="flex items-center gap-1">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-accent/15 text-accent-light'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                  }`
                }
              >
                <Icon size={18} />
                <span className="hidden sm:inline">{label}</span>
              </NavLink>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] transition-all duration-200 ml-2"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
