import { addDays, format, isSameDay } from 'date-fns'
import { es } from 'date-fns/locale'
import { useState } from 'react'
import { Link } from 'react-router'
import { toast } from 'sonner'
import { ListSkeleton } from '@/components/common/list-skeleton'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useClients } from '@/features/clients'
import { useTreatments } from '@/features/treatments'
import { CalendarX, ChevronLeft, ChevronRight, TriangleAlert } from 'lucide-react'
import { EmptyState } from '@/components/common/empty-state'

import { STATUS_ACTIONS, STATUS_BORDERS, STATUS_LABELS, STATUS_STYLES } from '../appointment-labels'
import { getNextStatuses } from '../../domain/appointment-rules'
import { useUpdateAppointment } from '../hooks/use-update-appointment'
import { useAppointments } from '../hooks/use-appointments'

export function AppointmentsPage() {
  // memoria: el dia que se esta viendo, empieza en hoy //
  const [day, setDay] = useState(new Date())
  // pide las citas, las clientas y los tratamientos //
  const { data: appointments = [], isLoading } = useAppointments()
  const { data: clients = [] } = useClients()
  const { data: treatments = [] } = useTreatments()
  // el hook que cambia el estado de una cita //
  const updateMutation = useUpdateAppointment()
  // portero: cargando //
  if (isLoading) return <ListSkeleton />
  // solo las citas de ese dia, ordenadas por hora //
  const dayAppointments = appointments
    .filter((appointment) => isSameDay(new Date(appointment.startsAt), day))
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt))

  return (
    <main className="flex flex-col gap-6 p-6">
      {/* titulo, cuantas citas hay y boton para agendar */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Agenda</h1>
          <p className="text-sm text-muted-foreground">
            {dayAppointments.length} {dayAppointments.length === 1 ? 'cita' : 'citas'}
          </p>
        </div>
        <Link
          to="/appointments/new"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          + Nueva cita
        </Link>
      </div>

      {/* navegacion de dias con flechas */}
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          aria-label="Día anterior"
          onClick={() => setDay(addDays(day, -1))}
        >
          <ChevronLeft />
        </Button>
        <Button variant="outline" onClick={() => setDay(new Date())}>
          Hoy
        </Button>
        <Button
          variant="outline"
          size="icon"
          aria-label="Día siguiente"
          onClick={() => setDay(addDays(day, 1))}
        >
          <ChevronRight />
        </Button>
        <span className="ml-2 text-lg font-semibold first-letter:uppercase">
          {format(day, "EEEE d 'de' MMMM", { locale: es })}
        </span>
      </div>

      {/* si no hay citas ese dia */}
      {dayAppointments.length === 0 && (
        <EmptyState
          icon={CalendarX}
          title="No hay citas este día"
          description="Agenda una cita o cambia de día con las flechas."
          actionLabel="+ Agendar cita"
          actionTo="/appointments/new"
        />
      )}

      {/* una tarjeta por cada cita */}
      <ul className="grid gap-3">
        {dayAppointments.map((appointment) => {
          // busca la clienta y el tratamiento por su id //
          const client = clients.find((client) => client.id === appointment.clientId)
          const treatment = treatments.find((treatment) => treatment.id === appointment.treatmentId)
          // las canceladas y las que no asistieron se ven mas claritas //
          const isInactive = appointment.status === 'cancelled' || appointment.status === 'no-show'

          return (
            <li
              key={appointment.id}
              className={`flex flex-wrap items-center gap-4 rounded-xl border border-l-4 bg-card p-4 ${STATUS_BORDERS[appointment.status]} ${isInactive ? 'opacity-60' : ''}`}
            >
              {/* columna de la hora */}
              <div className="flex w-16 flex-col">
                <span className="text-lg font-semibold">
                  {format(new Date(appointment.startsAt), 'HH:mm')}
                </span>
                <span className="text-sm text-muted-foreground">
                  {format(new Date(appointment.endsAt), 'HH:mm')}
                </span>
              </div>

              {/* clienta y tratamiento */}
              <div className="flex min-w-40 flex-1 flex-col">
                <span className="flex items-center gap-2 font-semibold">
                  {client?.fullName ?? 'Clienta no encontrada'}
                  {/* aviso si la clienta tiene alertas */}
                  {client && client.alerts.length > 0 && (
                    <TriangleAlert className="size-4 text-destructive" aria-label="Tiene alertas" />
                  )}
                </span>
                <span className="text-sm text-muted-foreground">
                  {treatment
                    ? `${treatment.name} · ${treatment.durationMinutes} min`
                    : 'Tratamiento no encontrado'}
                </span>
              </div>

              {/* estado y botones permitidos */}
              <div className="flex flex-col items-end gap-2">
                <Badge variant="outline" className={STATUS_STYLES[appointment.status]}>
                  {STATUS_LABELS[appointment.status]}
                </Badge>
                <div className="flex flex-wrap justify-end gap-2">
                  {getNextStatuses(appointment.status).map((status) => (
                    <Button
                      key={status}
                      size="sm"
                      variant="outline"
                      disabled={updateMutation.isPending}
                      onClick={() =>
                        updateMutation.mutate(
                          { ...appointment, status },
                          {
                            // mensaje verde o rojo segun como salga //
                            onSuccess: () => toast.success('Estado actualizado'),
                            onError: () => toast.error('No se pudo cambiar el estado'),
                          },
                        )
                      }
                    >
                      {STATUS_ACTIONS[status]}
                    </Button>
                  ))}
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </main>
  )
}
