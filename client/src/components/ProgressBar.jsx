export default function ProgressBar({ current, total }) {
  const pct = ((current + 1) / total) * 100

  return (
    <div className="w-full h-1 bg-surface-600/50 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500 ease-out"
        style={{
          width: `${pct}%`,
          background: 'linear-gradient(90deg, #f97316, #fbbf24)',
        }}
      />
    </div>
  )
}
