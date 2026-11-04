import type { NewClient, Client } from '../domain/client'
import type { ClientRepository } from '../domain/client-repository'

export async function createClient(
  repository: ClientRepository,
  input: NewClient,
): Promise<Client> {
  return repository.create(input)
}
