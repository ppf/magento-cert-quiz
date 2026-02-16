import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Check, BookOpen, Target, Shuffle, Play, Clock, Trophy } from 'lucide-react'
import api from '../api'
import useQuiz from '../hooks/useQuiz'
import useTimer from '../hooks/useTimer'
import QuestionCard from '../components/QuestionCard'
import ProgressBar from '../components/ProgressBar'

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function CategorySelect({ allQuestions, onStart }) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedDomain, setSelectedDomain] = useState('All')

  const domains = useMemo(() => {
    const counts = {}
    allQuestions.forEach((q) => {
      counts[q.examDomain] = (counts[q.examDomain] || 0) + 1
    })
    return Object.entries(counts).sort((a, b) => b[1] - a[1])
  }, [allQuestions])

  const domainFilteredQuestions = useMemo(() => {
    if (selectedDomain === 'All') return allQuestions
    return allQuestions.filter((q) => q.examDomain === selectedDomain)
  }, [allQuestions, selectedDomain])

  const categories = useMemo(() => {
    const counts = {}
    domainFilteredQuestions.forEach((q) => {
      counts[q.category] = (counts[q.category] || 0) + 1
    })
    return Object.entries(counts).sort((a, b) => b[1] - a[1])
  }, [domainFilteredQuestions])

  const questionCount = selectedCategory === 'All'
    ? domainFilteredQuestions.length
    : categories.find(([c]) => c === selectedCategory)?.[1] || 0

  return (
    <div className="flex items-center justify-center py-8">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-accent/10 border border-accent/20 text-accent-light text-xs font-medium mb-5">
            <Target size={14} />
            AD0-E722
          </div>
          <h1 className="text-3xl font-bold mb-3">
            <span className="bg-gradient-to-r from-accent via-accent-light to-accent-warm bg-clip-text text-transparent">
              Start a Quiz Session
            </span>
          </h1>
          <p className="text-slate-400 text-sm">{allQuestions.length} questions across {domains.length} exam domains</p>
        </div>

        {/* Category selector card */}
        <div className="rounded-2xl border border-slate-700/40 bg-surface-800/70 backdrop-blur-xl p-6 shadow-2xl shadow-black/30 mb-6">
          <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Exam Domain</label>
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => {
                setSelectedDomain('All')
                setSelectedCategory('All')
              }}
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
                onClick={() => {
                  setSelectedDomain(domain)
                  setSelectedCategory('All')
                }}
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

          <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Category</label>

          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 border ${
                selectedCategory === 'All'
                  ? 'bg-accent/20 border-accent/50 text-accent-light'
                  : 'bg-surface-700/40 border-slate-600/30 text-slate-300 hover:border-slate-500/50'
              }`}
            >
              {selectedDomain === 'All' ? 'All Categories' : `${selectedDomain} Categories`}
              <span className="ml-1.5 text-xs opacity-60">{domainFilteredQuestions.length}</span>
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

          <div className="flex items-center justify-between pt-4 border-t border-slate-700/30">
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <BookOpen size={16} />
              <span>{questionCount} question{questionCount !== 1 ? 's' : ''} selected</span>
            </div>
            <button
              onClick={() => onStart({ category: selectedCategory, examDomain: selectedDomain })}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-white transition-all duration-200 hover:brightness-110 active:scale-[0.97]"
              style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)' }}
            >
              <Play size={16} />
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function QuizPage() {
  const navigate = useNavigate()
  const [allQuestions, setAllQuestions] = useState(null)
  const [questions, setQuestions] = useState(null)
  const [sessionId, setSessionId] = useState(null)
  const [loading, setLoading] = useState(true)
  const timer = useTimer()

  useEffect(() => {
    api.get('/api/questions')
      .then(data => {
        setAllQuestions(data)
        setLoading(false)
      })
  }, [])

  const quiz = useQuiz(questions || [], sessionId)

  async function handleStart(filters) {
    const { category, examDomain } = filters

    const filtered = allQuestions.filter((q) => {
      const categoryMatch = category === 'All' || q.category === category
      const domainMatch = examDomain === 'All' || q.examDomain === examDomain
      return categoryMatch && domainMatch
    })

    const shuffled = shuffle(filtered)
    setQuestions(shuffled)

    let categoryFilter = 'All'
    if (examDomain !== 'All' && category !== 'All') categoryFilter = `${examDomain} / ${category}`
    else if (examDomain !== 'All') categoryFilter = `Domain: ${examDomain}`
    else if (category !== 'All') categoryFilter = category

    const { id } = await api.post('/api/sessions', { categoryFilter, totalQuestions: shuffled.length })
    setSessionId(id)
    timer.start()
  }

  useEffect(() => {
    if (quiz.quizCompleted && sessionId) {
      quiz.finishSession(timer.elapsedSeconds)
      navigate(`/results/${sessionId}`)
    }
  }, [quiz.quizCompleted])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!questions) {
    return <CategorySelect allQuestions={allQuestions} onStart={handleStart} />
  }

  if (!quiz.question) return null

  return (
    <div className="py-2">
      <div className="max-w-5xl mx-auto">
        {/* Progress */}
        <ProgressBar current={quiz.currentQuestion} total={quiz.totalQuestions} />

        {/* Stats bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-4 mb-5">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-700/50 border border-slate-700/30 text-sm text-slate-300">
              <BookOpen size={14} className="text-slate-500" />
              <span className="font-semibold text-white">{quiz.currentQuestion + 1}</span>
              <span className="text-slate-500">/</span>
              <span>{quiz.totalQuestions}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-700/50 border border-slate-700/30 text-sm text-slate-300">
              <Target size={14} className="text-emerald-500" />
              <span className="font-semibold text-emerald-400">{quiz.score}</span>
              <span className="text-slate-500">correct</span>
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-700/50 border border-slate-700/30 text-sm text-slate-400 tabular-nums">
            <Clock size={14} />
            {formatTime(timer.elapsedSeconds)}
          </span>
        </div>

        {/* Question */}
        <QuestionCard
          question={quiz.question}
          selectedAnswers={quiz.selectedAnswers}
          showResult={quiz.showResult}
          isMultiSelect={quiz.isMultiSelect}
          onOptionSelect={quiz.handleOptionSelect}
        />

        {/* Navigation */}
        <div className="flex items-center justify-between mt-5">
          <button
            onClick={quiz.prevQuestion}
            disabled={quiz.currentQuestion === 0}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium border border-slate-600/30 bg-surface-700/40 text-slate-300 transition-all hover:border-slate-500/50 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} />
            Previous
          </button>

          <div className="flex gap-2">
            {!quiz.showResult ? (
              <button
                onClick={quiz.checkAnswer}
                disabled={quiz.selectedAnswers.length === 0}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-[0.97] disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)' }}
              >
                <Check size={16} />
                Check Answer
              </button>
            ) : (
              <button
                onClick={quiz.nextQuestion}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-[0.97]"
                style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)' }}
              >
                {quiz.currentQuestion < quiz.totalQuestions - 1 ? (
                  <>Next <ChevronRight size={16} /></>
                ) : (
                  <><Trophy size={16} /> Results</>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
