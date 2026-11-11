import { addDays, format, isSameDay } from 'date-fns'
import { es } from 'date-fns/locale'
import { useState } from 'react'
import { Link } from 'react-router'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useClients } from '@/features/clients'
import { useTreatments } from '@/features/treatments'

import { STATUS_LABELS, STATUS_STYLES } from '../appointment-labels'
import { useAppointments } from '../hooks/use-appointments'

export function AppointmentsPage() {
  // memoria: el dia que se esta viendo, empieza en hoy //
  const [day, setDay] = useState(new Date())
  // pide las citas, las clientas y los tratamientos //
  const { data: appointments = [], isLoading } = useAppointments()
  const { data: clients = [] } = useClients()
  const { data: treatments = [] } = useTreatments()

  // portero: cargando //
  if (isLoading) return <p className="p-6">Cargando...</p>

  // solo las citas de ese dia, ordenadas por hora //
  const dayAppointments = appointments
    .filter((appointment) => isSameDay(new Date(appointment.startsAt), day))
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt))

  return (
    <main className="flex flex-col gap-4 p-6">
      {/* titulo y enlace para agendar */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Agenda</h1>
        <Link to="/appointments/new" className="text-sm font-semibold text-primary">
          + Nueva cita
        </Link>
      </div>

      {/* navegacion de dias */}
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="outline" onClick={() => setDay(addDays(day, -1))}>
          ← Anterior
        </Button>
        <Button variant="outline" onClick={() => setDay(new Date())}>
          Hoy
        </Button>
        <Button variant="outline" onClick={() => setDay(addDays(day, 1))}>
          Siguiente →
        </Button>
        <span className="font-medium capitalize">{format(day, "EEEE d 'de' MMMM", { locale: es })}</span>
      </div>

      {/* si no hay citas ese dia */}
      {dayAppointments.length === 0 && (
        <p className="text-sm text-muted-foreground">No hay citas este día.</p>
      )}

      {/* una fila por cada cita */}
      <ul className="grid gap-3">
        {dayAppointments.map((appointment) => {
          // busca el nombre de la clienta y del tratamiento por su id //
          const client = clients.find((client) => client.id === appointment.clientId)
          const treatment = treatments.find((treatment) => treatment.id === appointment.treatmentId)

          return (
            <li key={appointment.id} className="flex items-center justify-between gap-4 rounded-xl border p-4">
              <div className="flex flex-col">
                <span className="font-semibold">
                  {format(new Date(appointment.startsAt), 'HH:mm')} – {format(new Date(appointment.endsAt), 'HH:mm')}
                </span>
                <span>{client?.fullName ?? 'Clienta no encontrada'}</span>
                <span className="text-sm text-muted-foreground">{treatment?.name ?? 'Tratamiento no encontrado'}</span>
              </div>
              <Badge variant="outline" className={STATUS_STYLES[appointment.status]}>
                {STATUS_LABELS[appointment.status]}
              </Badge>
            </li>
          )
        })}
      </ul>
    </main>
  )
}
