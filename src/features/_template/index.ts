// Public door of the feature.
// Code outside this folder imports ONLY from this file, never from the layer
// folders directly. Export just what other parts of the app really need.

export type { Item } from './domain/item'
export { ItemsPage } from './ui/pages/items-page'
