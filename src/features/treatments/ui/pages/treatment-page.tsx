import { useTreatments } from '../hooks/use-treatments'
import { TreatmentCard } from '../components/treatment-card'

export const TreatmentsPage = () => {
  const { data: treatments = [], isLoading, error } = useTreatments()

  if (isLoading) return <p className="p-6">Cargando...</p>

  // error is now an Error object
  if (error) return <p className="p-6 text-destructive">{error.message}</p>

  return (
    <div className="grid gap-4 p-6">
      {treatments.map((t) => (
        <TreatmentCard key={t.id} treatment={t} />
      ))}
    </div>
  )
}