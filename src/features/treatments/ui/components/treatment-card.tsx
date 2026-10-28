import { Link } from 'react-router'

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import type { Treatment } from '../../domain/treatment'

interface TreatmentCardProps {
  treatment: Treatment
}

export function TreatmentCard({ treatment }: TreatmentCardProps) {
  return (
    <Link
      to={`/treatments/${treatment.id}`}
      className="block rounded-xl transition-transform hover:-translate-y-1"
    >
      <Card>
        <CardHeader>
          <CardTitle>{treatment.name}</CardTitle>
          <CardDescription>
            {treatment.description} · {treatment.durationMinutes} min · $
            {treatment.price.toLocaleString('es-CO')}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}
