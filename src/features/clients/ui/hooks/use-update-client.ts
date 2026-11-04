import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateClient } from '../../application/update-client'
import type { Client } from '../../domain/client'
import { clientRepository } from '../../infrastructure'

// cambia los datos de una clienta que ya existe //
export function useUpdateClient() {
  // trae el lugar donde estan guardados los datos //
  const queryClient = useQueryClient()

  return useMutation({
    // que hacer: recibe la clienta con su id y guarda los cambios //
    mutationFn: (client: Client) => updateClient(clientRepository, client),
    // cuando sale bien, avisa que la lista cambio para que se vuelva a buscar //
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['clients'] }),
  })
}
