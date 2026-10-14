// INFRASTRUCTURE layer: mock data.
// Fake items used by the in-memory repository until a real API exists.

import type { Item } from '../domain/item'

export const itemsMock: Item[] = [
  { id: '1', name: 'First item' },
  { id: '2', name: 'Second item' },
  { id: '3', name: 'Third item' },
]
