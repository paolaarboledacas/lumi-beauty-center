// INFRASTRUCTURE layer: the active repository.
// This is the single place that decides which adapter the feature uses.
// To move to a real API, change only this line: the use cases and the UI
// stay the same.

import { createInMemoryItemRepository } from './in-memory-item-repository'
import { itemsMock } from './items.mock'

export const itemRepository = createInMemoryItemRepository(itemsMock)
