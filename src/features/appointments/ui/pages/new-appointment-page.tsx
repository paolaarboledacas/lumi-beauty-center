import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { useClients } from '@/features/clients'
import { useTreatments } from '@/features/treatments'

import { calculateEndsAt, hasScheduleConflict } from '../../domain/appointment-rules'
import { useAppointments } from '../hooks/use-appointments'
import { useCreateAppointment } from '../hooks/use-create-appointment'

// reglas del formulario: hay que elegir clienta, tratamiento, fecha y hora //
const appointmentFormSchema = z.object({
  clientId: z.string().min(1, 'Elige una clienta'),
  treatmentId: z.string().min(1, 'Elige un tratamiento'),
  date: z.string().min(1, 'Elige la fecha'),
  time: z.string().min(1, 'Elige la hora'),
  notes: z.string().optional(),
})

// el molde de los datos del formulario, sacado de las reglas //
type AppointmentFormValues = z.infer<typeof appointmentFormSchema>

// formato ISO para guardar, ej: '2026-11-10T10:00:00' //
const ISO_FORMAT = "yyyy-MM-dd'T'HH:mm:ss"

export function NewAppointmentPage() {
  // sirve para volver a la agenda despues de guardar //
  const navigate = useNavigate()
  // datos de las 3 features //
  const { data: clients = [] } = useClients()
  const { data: treatments = [] } = useTreatments()
  const { data: appointments = [] } = useAppointments()
  // el hook que guarda la cita //
  const createMutation = useCreateAppointment()

  // la recepcionista del formulario //
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
  })

  // mira en vivo lo que van eligiendo, para mostrar la hora de fin //
  const selectedTreatment = treatments.find((treatment) => treatment.id === watch('treatmentId'))
  const date = watch('date')
  const time = watch('time')
  const endPreview =
    selectedTreatment && date && time
      ? format(calculateEndsAt(new Date(`${date}T${time}`), selectedTreatment.durationMinutes), 'HH:mm')
      : null

  // que pasa al presionar Agendar //
  function onSubmit(values: AppointmentFormValues) {
    const treatment = treatments.find((treatment) => treatment.id === values.treatmentId)
    if (!treatment) return

    // une fecha y hora en una sola fecha //
    const start = new Date(`${values.date}T${values.time}`)

    // regla: no se agenda en el pasado //
    if (start < new Date()) {
      setError('date', { message: 'No se puede agendar en el pasado' })
      return
    }

    // regla: la hora de fin se calcula sola //
    const end = calculateEndsAt(start, treatment.durationMinutes)

    // regla: no se puede cruzar con otra cita (una sola cabina) //
    if (hasScheduleConflict({ start, end }, appointments)) {
      setError('time', { message: 'Ya hay una cita en ese horario' })
      return
    }

    // todo bien: guarda la cita como agendada y vuelve a la agenda //
    createMutation.mutate(
      {
        clientId: values.clientId,
        treatmentId: values.treatmentId,
        startsAt: format(start, ISO_FORMAT),
        endsAt: format(end, ISO_FORMAT),
        status: 'scheduled',
        notes: values.notes,
      },
      { onSuccess: () => navigate('/appointments') },
    )
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-3xl font-semibold">Nueva cita</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-lg flex-col gap-4">
        {/* clienta: un menu con todas las clientas, se ve el nombre y se guarda el id */}
        <label htmlFor="clientId">Clienta</label>
        <select id="clientId" className="rounded-md border px-3 py-2" {...register('clientId')}>
          <option value="">Elige una clienta</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.fullName}
            </option>
          ))}
        </select>
        {errors.clientId && <p className="text-sm text-destructive">{errors.clientId.message}</p>}

        {/* tratamiento: un menu con todos los tratamientos */}
        <label htmlFor="treatmentId">Tratamiento</label>
        <select id="treatmentId" className="rounded-md border px-3 py-2" {...register('treatmentId')}>
          <option value="">Elige un tratamiento</option>
          {treatments.map((treatment) => (
            <option key={treatment.id} value={treatment.id}>
              {treatment.name} ({treatment.durationMinutes} min)
            </option>
          ))}
        </select>
        {errors.treatmentId && (
          <p className="text-sm text-destructive">{errors.treatmentId.message}</p>
        )}

        {/* fecha: el navegador muestra un calendario */}
        <label htmlFor="date">Fecha</label>
        <input id="date" type="date" className="rounded-md border px-3 py-2" {...register('date')} />
        {errors.date && <p className="text-sm text-destructive">{errors.date.message}</p>}

        {/* hora de inicio: el navegador muestra un reloj */}
        <label htmlFor="time">Hora de inicio</label>
        <input id="time" type="time" className="rounded-md border px-3 py-2" {...register('time')} />
        {errors.time && <p className="text-sm text-destructive">{errors.time.message}</p>}

        {/* hora de fin: no se escribe, se calcula */}
        {endPreview && <p className="text-sm text-muted-foreground">Termina a las {endPreview}</p>}

        {/* notas opcionales */}
        <label htmlFor="notes">Notas (opcional)</label>
        <textarea id="notes" rows={3} className="rounded-md border px-3 py-2" {...register('notes')} />

        {/* mientras guarda se apaga, para no agendar dos veces */}
        <Button type="submit" disabled={createMutation.isPending}>
          {createMutation.isPending ? 'Agendando...' : 'Agendar'}
        </Button>
      </form>
    </main>
  )
}

/*
  PARA QUE SIRVE ESTE ARCHIVO:
  Es la pagina para agendar una cita. Une las 3 features: elige una clienta
  (clients), un tratamiento (treatments) y guarda la cita (appointments).
  Al guardar usa las reglas de domain: no agendar en el pasado, calcular
  la hora de fin y revisar que no se cruce con otra cita. Si algo falla,
  setError muestra el mensaje en la casilla correcta.
  CAPA: ui (pages).
*/
