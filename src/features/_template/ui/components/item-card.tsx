// UI layer: components.
// A component only shows data it receives through props. It does not fetch
// anything, which makes it easy to reuse and to test.

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import type { Item } from '../../domain/item'

interface ItemCardProps {
  item: Item
}

export function ItemCard({ item }: ItemCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{item.name}</CardTitle>
        <CardDescription>ID: {item.id}</CardDescription>
      </CardHeader>
    </Card>
  )
}
