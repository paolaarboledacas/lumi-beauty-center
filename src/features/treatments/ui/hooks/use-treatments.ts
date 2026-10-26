import { useQuery } from '@tanstack/react-query'

import { getTreatmentById } from '../../application/get-treatment-by-id'
import { getTreatments } from '../../application/get-treatments'
import { treatmentRepository } from '../../infrastructure'

export function useTreatments() {
  return useQuery({
    queryKey: ['treatments'],
    queryFn: () => getTreatments(treatmentRepository),
  })
}

export function useTreatment(id: string) {
  return useQuery({
    queryKey: ['treatments', id],
    queryFn: () => getTreatmentById(treatmentRepository, id),
    enabled: !!id,
  })
}
