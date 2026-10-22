// UI layer: components.
// A component only shows data it receives through props. It does not fetch
// anything, which makes it easy to reuse and to test.

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import type { Treatment } from '../../domain/treatment'

interface TreatmentCardProps {
  treatment: Treatment
}

export function TreatmentCard({ treatment }: TreatmentCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{treatment.name}</CardTitle>
        <CardDescription>
          {treatment.description} · {treatment.durationMinutes} min · $
          {treatment.price.toLocaleString('es-CO')}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
