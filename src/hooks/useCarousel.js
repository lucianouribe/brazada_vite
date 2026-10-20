import { useEffect, useState } from 'react'

function useCarousel(length, delay) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(preference.matches)
    preference.addEventListener('change', update)
    update()
    return () => preference.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (paused || reducedMotion) return
    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % length), delay)
    return () => window.clearTimeout(timer)
  }, [index, length, delay, paused, reducedMotion])

  function move(direction) {
    setPaused(true)
    setIndex((current) => (current + direction + length) % length)
  }

  return { index, move, paused: paused || reducedMotion, toggle: () => setPaused(!paused), reducedMotion }
}

export default useCarousel
