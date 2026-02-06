import { useState, useEffect, useRef } from 'react'

export default function useTimer() {
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const intervalRef = useRef(null)
  const startedRef = useRef(false)

  function start() {
    if (startedRef.current) return
    startedRef.current = true
    intervalRef.current = setInterval(() => {
      setElapsedSeconds(s => s + 1)
    }, 1000)
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return { elapsedSeconds, start }
}
