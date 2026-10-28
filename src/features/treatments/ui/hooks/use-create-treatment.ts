import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createTreatment } from '../../application/create-treatment'
import type { NewTreatment } from '../../domain/treatment'
import { treatmentRepository } from '../../infrastructure'

export function useCreateTreatment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (values: NewTreatment) => createTreatment(treatmentRepository, values),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['treatments'] }),
  })
}
