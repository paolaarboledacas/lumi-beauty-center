import { useQuery } from '@tanstack/react-query'

import { getClientById } from '../../application/get-client-by-id'
import { getClients } from '../../application/get-clients'
import { clientRepository } from '../../infrastructure'

// trae todas las clientas, lo usa la pagina de la lista //
export function useClients() {
  return useQuery({
    queryKey: ['clients'],
    queryFn: () => getClients(clientRepository),
  })
}
// trae una sola clienta por su id, lo usa la ficha //
export function useClient(id: string) {
  return useQuery({
    queryKey: ['clients', id],
    queryFn: () => getClientById(clientRepository, id),
    enabled: !!id,
  })
}
