// UI layer: hooks.
// A hook connects React to a use case: it calls the use case with the active
// repository and keeps the result in state for the components to render.

import { useEffect, useState } from 'react'

import { getItems } from '../../application/get-items'
import type { Item } from '../../domain/item'
import { itemRepository } from '../../infrastructure'

interface UseItemsResult {
  items: Item[]
  isLoading: boolean
  error: string | null
}

// TanStack Query will replace this manual loading/error state later.
export function useItems(): UseItemsResult {
  const [items, setItems] = useState<Item[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Avoids updating state if the component is removed before the data arrives.
    let isCancelled = false

    getItems(itemRepository)
      .then((loadedItems) => {
        if (!isCancelled) setItems(loadedItems)
      })
      .catch((cause: unknown) => {
        if (!isCancelled) {
          setError(cause instanceof Error ? cause.message : 'Could not load the items.')
        }
      })
      .finally(() => {
        if (!isCancelled) setIsLoading(false)
      })

    return () => {
      isCancelled = true
    }
  }, [])

  return { items, isLoading, error }
}
