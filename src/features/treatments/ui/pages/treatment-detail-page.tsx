import { Clock, Wallet } from 'lucide-react'
import { Link, useParams } from 'react-router'

import { ListSkeleton } from '@/components/common/list-skeleton'
import { Badge } from '@/components/ui/badge'

import { useTreatment } from '../hooks/use-treatments'
import { CATEGORY_IMAGES, CATEGORY_LABELS } from '../treatment-labels'

// formato de pesos colombianos: $ 150.000 //
const money = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

export function TreatmentDetailPage() {
  // lee el id de la direccion y busca el tratamiento //
  const { id = '' } = useParams()
  const { data: treatment, isLoading } = useTreatment(id)

  // porteros: cargando y no encontrado //
  if (isLoading) return <ListSkeleton rows={2} />
  if (!treatment) return <p className="p-6">No encontramos este tratamiento.</p>

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-6 p-6">
      <Link to="/treatments" className="text-sm">
        ← Volver
      </Link>

      {/* la foto grande, segun la categoria */}
      <img
        src={CATEGORY_IMAGES[treatment.category]}
        alt={treatment.name}
        className="h-64 w-full rounded-2xl object-cover"
      />

      {/* categoria, nombre y descripcion */}
      <div className="flex flex-col gap-2">
        <Badge variant="secondary">{CATEGORY_LABELS[treatment.category]}</Badge>
        <h1 className="text-3xl font-semibold">{treatment.name}</h1>
        <p className="text-muted-foreground">{treatment.description}</p>
      </div>

      {/* duracion y precio, uno al lado del otro */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-3 rounded-xl border p-4">
          <Clock className="size-5 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Duración</p>
            <p className="font-semibold">{treatment.durationMinutes} minutos</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl border p-4">
          <Wallet className="size-5 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Precio</p>
            <p className="font-semibold">{money.format(treatment.price)}</p>
          </div>
        </div>
      </div>

      {/* boton para agendar */}
      <Link
        to="/appointments/new"
        className="w-fit rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
      >
        Agendar este tratamiento
      </Link>
    </main>
  )
}
