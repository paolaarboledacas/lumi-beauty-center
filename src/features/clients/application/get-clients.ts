// trae el molde de la clienta y el contrato //
import type { Client } from '../domain/client'
import type { ClientRepository } from '../domain/client-repository'

// accion: pedir todas las clientas //
export async function getClients(repository: ClientRepository): Promise<Client[]> {
  return repository.findAll()
}
