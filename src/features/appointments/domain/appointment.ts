// los estados por los que pasa una cita //
export type AppointmentStatus = 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no-show'

export interface Appointment {
  id: string
  // de quien es la cita: guarda solo el id de la clienta //
  clientId: string
  // que tratamiento se hace: guarda solo el id del tratamiento //
  treatmentId: string
  // cuando empieza y cuando termina, como texto ISO //
  startsAt: string
  endsAt: string
  status: AppointmentStatus
  notes?: string
}

// una cita sin id, para el formulario //
export type NewAppointment = Omit<Appointment, 'id'>