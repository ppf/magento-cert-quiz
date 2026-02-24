import { useState, useEffect, useMemo } from 'react'
import { Search, ChevronRight, BookOpen, CheckCircle2 } from 'lucide-react'
import api from '../api'

export default function QuestionBankPage() {
  const [allQuestions, setAllQuestions] = useState(null)
  const [search, setSearch] = useState('')
  const [selectedDomain, setSelectedDomain] = useState('All')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [examFeedbackOnly, setExamFeedbackOnly] = useState(false)
  const [expanded, setExpanded] = useState({})

  useEffect(() => {
    api.get('/api/questions').then(setAllQuestions)
  }, [])

  const baseQuestions = useMemo(() => {
    if (!allQuestions) return []
    if (examFeedbackOnly) return allQuestions.filter(q => q.examFeedback)
    return allQuestions
  }, [allQuestions, examFeedbackOnly])

  const examFeedbackCount = useMemo(() => {
    if (!allQuestions) return 0
    return allQuestions.filter(q => q.examFeedback).length
  }, [allQuestions])

  const domains = useMemo(() => {
    const counts = {}
    baseQuestions.forEach(q => { counts[q.examDomain] = (counts[q.examDomain] || 0) + 1 })
    return Object.entries(counts).sort((a, b) => b[1] - a[1])
  }, [baseQuestions])

  const domainFiltered = useMemo(() => {
    if (selectedDomain === 'All') return baseQuestions
    return baseQuestions.filter(q => q.examDomain === selectedDomain)
  }, [baseQuestions, selectedDomain])

  const categories = useMemo(() => {
    const counts = {}
    domainFiltered.forEach(q => { counts[q.category] = (counts[q.category] || 0) + 1 })
    return Object.entries(counts).sort((a, b) => b[1] - a[1])
  }, [domainFiltered])

  const filtered = useMemo(() => {
    let qs = domainFiltered
    if (selectedCategory !== 'All') {
      qs = qs.filter(q => q.category === selectedCategory)
    }
    if (!search.trim()) return qs
    const term = search.toLowerCase()
    return qs.filter(q =>
      q.question.toLowerCase().includes(term) ||
      q.category.toLowerCase().includes(term) ||
      q.examDomain.toLowerCase().includes(term) ||
      (q.explanation && q.explanation.toLowerCase().includes(term)) ||
      (q.codeExample && q.codeExample.toLowerCase().includes(term)) ||
      q.options.some(o => o.text.toLowerCase().includes(term)) ||
      (q.objectiveTags && q.objectiveTags.some(t => t.toLowerCase().includes(term)))
    )
  }, [domainFiltered, selectedCategory, search])

  const toggleExpand = (id) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }))

  if (!allQuestions) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <BookOpen size={20} className="text-accent" />
          <h1 className="text-xl font-bold text-white">Question Bank</h1>
        </div>
        <p className="text-sm text-slate-400">{baseQuestions.length} questions across {domains.length} exam domains</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search questions, options, explanations, code..."
          className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface-800/70 border border-slate-700/40 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors"
        />
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-slate-700/40 bg-surface-800/70 backdrop-blur-xl p-5 space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2.5">Source</label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => { setExamFeedbackOnly(false); setSelectedDomain('All'); setSelectedCategory('All') }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 border ${
                !examFeedbackOnly
                  ? 'bg-accent/20 border-accent/50 text-accent-light'
                  : 'bg-surface-700/40 border-slate-600/30 text-slate-300 hover:border-slate-500/50'
              }`}
            >
              All Questions
              <span className="ml-1.5 text-xs opacity-60">{allQuestions.length}</span>
            </button>
            <button
              onClick={() => { setExamFeedbackOnly(true); setSelectedDomain('All'); setSelectedCategory('All') }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 border ${
                examFeedbackOnly
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                  : 'bg-surface-700/40 border-slate-600/30 text-slate-300 hover:border-slate-500/50'
              }`}
            >
              Exam Feedback
              <span className="ml-1.5 text-xs opacity-60">{examFeedbackCount}</span>
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2.5">Exam Domain</label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => { setSelectedDomain('All'); setSelectedCategory('All') }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 border ${
                selectedDomain === 'All'
                  ? 'bg-accent/20 border-accent/50 text-accent-light'
                  : 'bg-surface-700/40 border-slate-600/30 text-slate-300 hover:border-slate-500/50'
              }`}
            >
              All Domains
              <span className="ml-1.5 text-xs opacity-60">{allQuestions.length}</span>
            </button>
            {domains.map(([domain, count]) => (
              <button
                key={domain}
                onClick={() => { setSelectedDomain(domain); setSelectedCategory('All') }}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 border ${
                  selectedDomain === domain
                    ? 'bg-accent/20 border-accent/50 text-accent-light'
                    : 'bg-surface-700/40 border-slate-600/30 text-slate-300 hover:border-slate-500/50'
                }`}
              >
                {domain}
                <span className="ml-1.5 text-xs opacity-60">{count}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2.5">Category</label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 border ${
                selectedCategory === 'All'
                  ? 'bg-accent/20 border-accent/50 text-accent-light'
                  : 'bg-surface-700/40 border-slate-600/30 text-slate-300 hover:border-slate-500/50'
              }`}
            >
              All Categories
              <span className="ml-1.5 text-xs opacity-60">{domainFiltered.length}</span>
            </button>
            {categories.map(([cat, count]) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 border ${
                  selectedCategory === cat
                    ? 'bg-accent/20 border-accent/50 text-accent-light'
                    : 'bg-surface-700/40 border-slate-600/30 text-slate-300 hover:border-slate-500/50'
                }`}
              >
                {cat}
                <span className="ml-1.5 text-xs opacity-60">{count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result count */}
      <div className="text-sm text-slate-400">
        {filtered.length} question{filtered.length !== 1 ? 's' : ''}
        {search.trim() && <span className="text-slate-500"> matching "{search.trim()}"</span>}
      </div>

      {/* Question list */}
      <div className="space-y-2">
        {filtered.map(q => {
          const isOpen = expanded[q.id]
          return (
            <div
              key={q.id}
              className="rounded-xl border border-white/[0.06] overflow-hidden transition-colors"
              style={{
                background: 'linear-gradient(145deg, rgba(30,41,59,0.35) 0%, rgba(26,26,46,0.45) 100%)',
              }}
            >
              {/* Collapsed row */}
              <button
                onClick={() => toggleExpand(q.id)}
                className="w-full flex items-center gap-3 p-4 text-left hover:bg-white/[0.02] transition-colors"
              >
                <span className="text-xs font-mono text-slate-500 w-8 shrink-0">
                  {String(q.id).padStart(3, '0')}
                </span>

                <span className="text-xs font-medium px-2 py-0.5 rounded bg-accent/10 text-accent-light shrink-0">
                  {q.category}
                </span>

                <span className={`text-xs font-medium px-2 py-0.5 rounded shrink-0 ${
                  q.difficulty === 'Hard'
                    ? 'bg-red-500/10 text-red-400'
                    : 'bg-amber-500/10 text-amber-400'
                }`}>
                  {q.difficulty}
                </span>

                <span className="flex-1 text-sm text-slate-300 truncate">
                  {q.question}
                </span>

                <ChevronRight
                  size={16}
                  className={`text-slate-600 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-90' : ''}`}
                />
              </button>

              {/* Expanded detail */}
              {isOpen && (
                <div className="px-4 pb-4 pt-0 border-t border-white/[0.04]">
                  <div className="pt-4 space-y-4">
                    <p className="text-sm text-slate-300 leading-relaxed">{q.question}</p>

                    {/* Options */}
                    <div className="space-y-1.5">
                      {q.options.map(opt => {
                        const isCorrect = q.correctAnswers.includes(opt.id)
                        return (
                          <div
                            key={opt.id}
                            className={`flex items-start gap-2.5 px-3 py-2 rounded-lg text-sm ${
                              isCorrect
                                ? 'bg-emerald-500/10 border border-emerald-500/20'
                                : 'bg-white/[0.02] border border-transparent'
                            }`}
                          >
                            <span className={`font-mono text-xs mt-0.5 shrink-0 ${
                              isCorrect ? 'text-emerald-400' : 'text-slate-500'
                            }`}>
                              {opt.id}.
                            </span>
                            <span className={isCorrect ? 'text-emerald-300' : 'text-slate-400'}>
                              {opt.text}
                            </span>
                            {isCorrect && <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />}
                          </div>
                        )
                      })}
                    </div>

                    {q.correctAnswers.length > 1 && (
                      <p className="text-xs text-slate-500">
                        Multi-select: {q.correctAnswers.length} correct answers
                      </p>
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

        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-500">
            <Search size={32} className="mx-auto mb-3 opacity-40" />
            <p className="text-sm">No questions match your filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
