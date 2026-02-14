import { useState, useCallback } from 'react'
import api from '../api'

export default function useQuiz(questions, sessionId) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [showResult, setShowResult] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [score, setScore] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set())

  const question = questions[currentQuestion]
  const isMultiSelect = question?.correctAnswers.length > 1
  const currentSelected = selectedAnswers[currentQuestion] || []
  const totalQuestions = questions.length

  const handleOptionSelect = useCallback((optionId) => {
    if (showResult) return
    setSelectedAnswers(prev => {
      const current = prev[currentQuestion] || []
      if (isMultiSelect) {
        const toggled = current.includes(optionId)
          ? current.filter(id => id !== optionId)
          : [...current, optionId]
        return { ...prev, [currentQuestion]: toggled }
      }
      return { ...prev, [currentQuestion]: [optionId] }
    })
  }, [showResult, currentQuestion, isMultiSelect])

  const checkAnswer = useCallback(() => {
    setShowResult(true)
    const selected = selectedAnswers[currentQuestion] || []
    const isCorrect = selected.length === question.correctAnswers.length &&
      selected.every(a => question.correctAnswers.includes(a))

    if (isCorrect && !answeredQuestions.has(currentQuestion)) {
      setScore(s => s + 1)
    }
    setAnsweredQuestions(prev => new Set([...prev, currentQuestion]))

    api.post('/api/answers', {
      sessionId,
      questionId: question.id,
      questionOrder: currentQuestion,
      selectedAnswers: selected,
      isCorrect,
    }).catch(() => {})
  }, [selectedAnswers, currentQuestion, question, answeredQuestions, sessionId])

  const nextQuestion = useCallback(() => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(i => i + 1)
      setShowResult(false)
    } else {
      setQuizCompleted(true)
    }
  }, [currentQuestion, questions.length])

  const prevQuestion = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion(i => i - 1)
      setShowResult(false)
    }
  }, [currentQuestion])

  const finishSession = useCallback((timeSpentSeconds) => {
    api.post(`/api/sessions/${sessionId}/finish`, { correctCount: score, timeSpentSeconds }).catch(() => {})
  }, [sessionId, score])

  const restartQuiz = useCallback(() => {
    setCurrentQuestion(0)
    setSelectedAnswers({})
    setShowResult(false)
    setQuizCompleted(false)
    setScore(0)
    setAnsweredQuestions(new Set())
  }, [])

  return {
    question,
    currentQuestion,
    totalQuestions,
    selectedAnswers: currentSelected,
    showResult,
    quizCompleted,
    score,
    isMultiSelect,
    handleOptionSelect,
    checkAnswer,
    nextQuestion,
    prevQuestion,
    restartQuiz,
    finishSession,
  }
}
