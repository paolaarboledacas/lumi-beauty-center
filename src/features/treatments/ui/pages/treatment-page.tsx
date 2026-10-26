import { Link } from 'react-router'

import { TreatmentCard } from '../components/treatment-card'
import { useTreatments } from '../hooks/use-treatments'

export function TreatmentsPage() {
  const { data: treatments = [], isLoading, error } = useTreatments()

  if (isLoading) return <p className="p-6">Cargando...</p>

  // error is now an Error object
  if (error) return <p className="p-6 text-destructive">{error.message}</p>

  return (
    <main className="flex flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Treatments</h1>
        <Link to="/treatments/new" className="text-sm font-semibold text-primary">
          + New treatment
        </Link>
      </div>
      <div className="grid gap-4">
        {treatments.map((t) => (
          <TreatmentCard key={t.id} treatment={t} />
        ))}
      </div>
    </main>
  )
}
