// DOMAIN layer: ports.
// A port is a contract: it says WHAT we need from the data source, not HOW it
// is done. The "how" lives in `infrastructure/` (in memory today, HTTP later).
// Every method returns a Promise so both kinds of adapter fit the same contract.

import type { Item } from './item'

export interface ItemRepository {
  findAll(): Promise<Item[]>
  findById(id: string): Promise<Item | null>
}
