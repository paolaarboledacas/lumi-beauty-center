import type { Client } from '../domain/client'
import type { ClientRepository } from '../domain/client-repository'

export async function getClientById(
  repository: ClientRepository,
  id: string,
): Promise<Client | null> {
  return repository.findById(id)
}
