import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createClient } from '../../application/create-client'
import type { NewClient } from '../../domain/client'
import { clientRepository } from '../../infrastructure'

// guarda una clienta nueva //
export function useCreateClient() {
  // trae el lugar donde estan guardados los datos //
  const queryClient = useQueryClient()

  return useMutation({
    // que hacer: recibe los datos del formulario y guarda la clienta //
    mutationFn: (values: NewClient) => createClient(clientRepository, values),
    // cuando sale bien, avisa que la lista cambio para que se vuelva a buscar //
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['clients'] }),
  })
}