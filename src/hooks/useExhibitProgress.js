import { useMemo, useState } from 'react'

export function useExhibitProgress(total) {
  const [visitedExhibits, setVisitedExhibits] = useState([])
  const visit = (id) => setVisitedExhibits((current) => current.includes(id) ? current : [...current, id])
  const isComplete = visitedExhibits.length === total
  return useMemo(() => ({ visitedExhibits, visit, isComplete, count: visitedExhibits.length }), [visitedExhibits, isComplete])
}
