import { useEffect, useState } from 'react'
import { getTreatments } from '../../application/get-treatments'
import type { Treatment } from '../../domain/treatment'
import { inMemoryTreatmentRepository } from '../../infrastructure'

interface UseTreatmentsResult {
  treatments: Treatment[]
  isLoading: boolean
  error: string | null
}

export function useTreatments(): UseTreatmentsResult {
  const [treatments, setTreatments] = useState<Treatment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isCancelled = false

    getTreatments(inMemoryTreatmentRepository)
      .then((loadedTreatments) => {
        if (!isCancelled) setTreatments(loadedTreatments)
      })
      .catch((cause: unknown) => {
        if (!isCancelled) {
          setError(
            cause instanceof Error ? cause.message : 'No se pudieron cargar los tratamientos.',
          )
        }
      })
      .finally(() => {
        if (!isCancelled) setIsLoading(false)
      })

    return () => {
      isCancelled = true
    }
  }, [])

  return { treatments, isLoading, error }
}
