import { useMutation, useQueryClient } from '@tanstack/react-query'

import { removeClient } from '../../application/remove-client'
import { clientRepository } from '../../infrastructure'

// elimina una clienta //
export function useRemoveClient() {
  // trae el lugar donde estan guardados los datos //
  const queryClient = useQueryClient()

  return useMutation({
    // que hacer: recibe el id de la clienta y la elimina //
    mutationFn: (id: string) => removeClient(clientRepository, id),
    // cuando sale bien, avisa que la lista cambio para que se vuelva a buscar //
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['clients'] }),
  })
}
