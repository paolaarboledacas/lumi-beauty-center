import { Link } from 'react-router'
import { ListSkeleton } from '@/components/common/list-skeleton'
import { TreatmentCard } from '../components/treatment-card'
import { useTreatments } from '../hooks/use-treatments'
import { Sparkles } from 'lucide-react'
import { EmptyState } from '@/components/common/empty-state'

export function TreatmentsPage() {
  const { data: treatments = [], isLoading, error } = useTreatments()

  if (isLoading) return <ListSkeleton />
  // error is now an Error object
  if (error) return <p className="p-6 text-destructive">{error.message}</p>
  // si no hay ningun tratamiento, un mensaje amable //
  if (treatments.length === 0) {
    return (
      <main className="flex flex-col gap-4 p-6">
        <h1 className="text-3xl font-semibold"> Tratamientos</h1>
        <EmptyState
          icon={Sparkles}
          title="Todavía no hay tratamientos"
          description="Crea el primero para armar tu catálogo."
          actionLabel="+ Crear tratamiento"
          actionTo="/treatments/new"
        />
      </main>
    )
  }

  return (
    <main className="flex flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold"> Nuestros Tratamientos</h1>
        <Link to="/treatments/new" className="text-sm font-semibold text-primary">
          + Nuevo tratamiento
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
