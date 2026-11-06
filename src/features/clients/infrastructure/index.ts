// trae la funcion que crea el lugar donde se guardan las clientas //
import { createLocalStorageClientRepository } from './local-storage-client-repository'
// trae las clientas de ejemplo para usarlas al inicio //
import { clientsMock } from './client.mock'

// aqui se elige donde se guardan las clientas de toda la app //
export const clientRepository = createLocalStorageClientRepository(clientsMock)
