import { Check, X, BookOpen, Target, Lightbulb, Code } from 'lucide-react'

function OptionItem({ option, isSelected, showResult, correctAnswers, onClick }) {
  const isCorrect = correctAnswers.includes(option.id)
  const isWrongSelected = showResult && isSelected && !isCorrect

  let containerClass = 'flex items-start gap-3 p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer group'
  let letterClass = 'w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 transition-all duration-200'

  if (showResult && isCorrect) {
    containerClass += ' border-emerald-500/60 bg-emerald-500/10'
    letterClass += ' bg-emerald-500 text-white'
  } else if (isWrongSelected) {
    containerClass += ' border-red-500/60 bg-red-500/10'
    letterClass += ' bg-red-500 text-white'
  } else if (isSelected) {
    containerClass += ' border-accent/60 bg-accent/10'
    letterClass += ' bg-accent text-white'
  } else {
    containerClass += ' border-slate-600/30 bg-surface-900/50 hover:border-slate-500/50 hover:bg-surface-700/40'
    letterClass += ' bg-slate-700/60 text-slate-400 group-hover:bg-slate-600/60'
  }

  if (showResult) {
    containerClass += ' cursor-default'
  }

  const icon = showResult && isCorrect
    ? <Check size={14} />
    : isWrongSelected
      ? <X size={14} />
      : option.id

  return (
    <div className={containerClass} onClick={onClick}>
      <div className={letterClass}>{icon}</div>
      <span className="flex-1 leading-relaxed text-sm text-slate-200">{option.text}</span>
    </div>
  )
}

export default function QuestionCard({ question, selectedAnswers, showResult, isMultiSelect, onOptionSelect }) {
  return (
    <div className="relative rounded-2xl border border-slate-700/40 bg-surface-800/70 backdrop-blur-xl p-6 shadow-2xl shadow-black/30">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/[0.03] to-transparent pointer-events-none" />

      <div className="relative">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-blue-500/15 text-blue-400 border border-blue-500/20">
            <BookOpen size={12} />
            {question.category}
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-accent/15 text-accent-light border border-accent/20">
            <Target size={12} />
            {question.difficulty}
          </span>
          {isMultiSelect && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-violet-500/15 text-violet-400 border border-violet-500/20">
              Select {question.correctAnswers.length}
            </span>
          )}
        </div>

        {/* Question */}
        <p className="text-base leading-7 text-slate-100 mb-5 whitespace-pre-wrap">{question.question}</p>

        {/* Options */}
        <div className="flex flex-col gap-2 mb-5">
          {question.options.map(option => (
            <OptionItem
              key={option.id}
              option={option}
              isSelected={selectedAnswers.includes(option.id)}
              showResult={showResult}
              correctAnswers={question.correctAnswers}
              onClick={() => onOptionSelect(option.id)}
            />
          ))}
        </div>

        {/* Explanation */}
        {showResult && (
          <div className="mt-4 rounded-xl bg-surface-900/70 border border-slate-700/30 p-5 space-y-4 animate-fade-in">
            <div>
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm mb-2">
                <Lightbulb size={16} />
                Explanation
              </div>
              <p className="text-sm leading-7 text-slate-300 whitespace-pre-wrap">{question.explanation}</p>
            </div>

            {question.codeExample && (
              <div>
                <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm mb-2">
                  <Code size={16} />
                  Code Example
                </div>
                <pre className="bg-[#0a0a18] rounded-lg p-4 overflow-auto max-h-80 border border-slate-800/60 text-xs leading-relaxed">
                  <code className="text-cyan-300">{question.codeExample}</code>
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
