import { Link, useParams } from 'react-router'

import { Badge } from '@/components/ui/badge'

import { ALERT_LABELS, SKIN_TYPE_LABELS } from '../client-labels'
import { useClient } from '../hooks/use-clients'

export function ClientDetailPage() {
  // lee el id de la direccion, por ejemplo /clients/c4 //
  const { id = '' } = useParams()
  // busca la clienta con ese id //
  const { data: client, isLoading } = useClient(id)

  // porteros: cargando y no encontrada //
  if (isLoading) return <p className="p-6">Cargando...</p>
  if (!client) return <p className="p-6">No encontramos esta clienta.</p>

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-6 p-6">
      <Link to="/clients" className="text-sm">
        ← Volver
      </Link>

      <h1 className="text-3xl font-semibold">{client.fullName}</h1>

      {/* alertas arriba y en rojo, solo si tiene alguna */}
      {client.alerts.length > 0 && (
        <div className="rounded-xl border border-destructive p-4">
          <p className="mb-2 font-semibold text-destructive">⚠️ Alertas</p>
          <div className="flex flex-wrap gap-1">
            {client.alerts.map((alert) => (
              <Badge key={alert} variant="destructive">
                {ALERT_LABELS[alert]}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* datos de la ficha */}
      <div className="grid gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Teléfono</p>
          <p>{client.phone}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Correo</p>
          {/* si no tiene correo o esta vacio, muestra Sin correo */}
          <p>{client.email || 'Sin correo'}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Tipo de piel</p>
          <p>{SKIN_TYPE_LABELS[client.skinType]}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Notas</p>
          <p>{client.notes || 'Sin notas'}</p>
        </div>
      </div>

      {/* boton para editar */}
      <Link
        to={`/clients/${client.id}/edit`}
        className="w-fit rounded-md border px-4 py-2 text-sm font-medium"
      >
        Editar
      </Link>
    </main>
  )
}
