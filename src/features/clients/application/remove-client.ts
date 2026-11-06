import type { ClientRepository } from '../domain/client-repository'

export async function removeClient(repository: ClientRepository, id: string): Promise<void> {
  return repository.remove(id)
}
