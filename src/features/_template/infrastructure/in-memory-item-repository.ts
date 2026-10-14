// INFRASTRUCTURE layer: adapters.
// An adapter is a real implementation of a port from `domain/`.
// This one keeps the items in an array in memory. Later, an HTTP adapter
// (axios) will implement the same `ItemRepository` interface.

import type { Item } from '../domain/item'
import type { ItemRepository } from '../domain/item-repository'

export function createInMemoryItemRepository(seed: Item[]): ItemRepository {
  const items = [...seed]

  return {
    async findAll() {
      return [...items]
    },
    async findById(id) {
      return items.find((item) => item.id === id) ?? null
    },
  }
}
