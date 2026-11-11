// los estados por los que pasa una cita //
export type AppointmentStatus = 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no-show'

// el molde de la cita //
export interface Appointment {
  id: string
  // de quien es la cita: guarda solo el id de la clienta //
  clientId: string
  // que tratamiento se hace: guarda solo el id del tratamiento //
  treatmentId: string
  // cuando empieza y cuando termina, como texto ISO (ej: '2026-11-10T10:00:00') //
  startsAt: string
  endsAt: string
  // en que estado esta la cita //
  status: AppointmentStatus
  // notas opcionales //
  notes?: string
}

// una cita sin id, para el formulario (el id lo pone la app al guardarla) //
export type NewAppointment = Omit<Appointment, 'id'>

/*
  PARA QUE SIRVE ESTE ARCHIVO:
  Es la plantilla de la cita: dice que datos tiene y que estados puede tener.
  No hace nada, solo describe.
  La cita guarda solo los id de la clienta y del tratamiento (no copias),
  asi si cambia un telefono o un precio, las citas no quedan desactualizadas.
  CAPA: domain (que son las cosas).
*/
