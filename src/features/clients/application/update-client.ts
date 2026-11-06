import type { Client } from '../domain/client'
import type { ClientRepository } from '../domain/client-repository'

export async function updateClient(repository: ClientRepository, client: Client): Promise<Client> {
  return repository.update(client)
}
