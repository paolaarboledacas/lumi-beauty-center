// UI layer: pages.
// A page is a full screen. It gets its data from a hook and decides what to
// show in each situation: loading, error, empty list or the list itself.

import { ItemCard } from '../components/item-card'
import { useItems } from '../hooks/use-items'

export function ItemsPage() {
  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-4 p-6">
      <h1 className="text-2xl font-semibold">Items</h1>
      <ItemsList />
    </main>
  )
}

function ItemsList() {
  const { items, isLoading, error } = useItems()

  if (isLoading) {
    return <p className="text-muted-foreground">Loading items...</p>
  }

  if (error) {
    return (
      <p role="alert" className="text-destructive">
        {error}
      </p>
    )
  }

  if (items.length === 0) {
    return <p className="text-muted-foreground">There are no items yet.</p>
  }

  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item.id}>
          <ItemCard item={item} />
        </li>
      ))}
    </ul>
  )
}
