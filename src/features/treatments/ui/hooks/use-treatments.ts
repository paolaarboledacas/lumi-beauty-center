import { useQuery } from '@tanstack/react-query'

import { getTreatments } from '../../application/get-treatments'
import { treatmentRepository } from '../../infrastructure'

export const useTreatments = () => {
  return useQuery({
    queryKey: ['treatments'],
    queryFn: () => getTreatments(treatmentRepository),
  })
}