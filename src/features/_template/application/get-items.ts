// APPLICATION layer: use cases.
// A use case is a small function that does ONE thing the app needs.
// It receives the repository as a parameter (that is all "dependency
// injection" means here), so it never knows where the data really comes from.
// Business rules (filtering, sorting, validating) go here or in `domain/`.

import type { Item } from '../domain/item'
import type { ItemRepository } from '../domain/item-repository'

export function getItems(repository: ItemRepository): Promise<Item[]> {
  return repository.findAll()
}
