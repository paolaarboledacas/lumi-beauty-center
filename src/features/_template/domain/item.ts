// DOMAIN layer: entities.
// An entity describes one "thing" of the business (here, a generic Item).
// It is plain TypeScript: no React, no axios, no imports from other layers.

export interface Item {
  id: string
  name: string
}
