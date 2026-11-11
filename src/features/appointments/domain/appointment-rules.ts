import { addMinutes, areIntervalsOverlapping } from 'date-fns'

import type { Appointment, AppointmentStatus } from './appointment'

// REGLA 1: calcula la hora de fin: inicio + duracion del tratamiento //
export function calculateEndsAt(startsAt: Date, durationMinutes: number): Date {
  return addMinutes(startsAt, durationMinutes)
}

// REGLA 2: revisa si el horario nuevo se cruza con alguna cita (sin contar las canceladas) //
export function hasScheduleConflict(
  candidate: { start: Date; end: Date },
  appointments: Appointment[],
): boolean {
  return (
    appointments
      // las canceladas no ocupan la cabina //
      .filter((appointment) => appointment.status !== 'cancelled')
      // ¿alguna se cruza con el horario nuevo? las citas seguidas si se permiten //
      .some((appointment) =>
        areIntervalsOverlapping(candidate, {
          start: new Date(appointment.startsAt),
          end: new Date(appointment.endsAt),
        }),
      )
  )
}

// mapa: desde cada estado, a cuales se puede pasar //
const NEXT_STATUSES: Record<AppointmentStatus, AppointmentStatus[]> = {
  scheduled: ['confirmed', 'cancelled'],
  confirmed: ['completed', 'cancelled', 'no-show'],
  completed: [],
  cancelled: [],
  'no-show': [],
}

// REGLA 3: devuelve los estados siguientes permitidos //
export function getNextStatuses(status: AppointmentStatus): AppointmentStatus[] {
  return NEXT_STATUSES[status]
}

/*
  PARA QUE SIRVE ESTE ARCHIVO:
  Aqui viven las reglas del centro para las citas:
  1. la hora de fin se calcula sola con la duracion del tratamiento,
  2. dos citas no se pueden cruzar porque hay una sola cabina,
  3. una cita solo puede pasar a ciertos estados (no se completa una cancelada).
  Son funciones puras: reciben datos y devuelven un resultado, sin React ni guardar nada.
  CAPA: domain (reglas del negocio).
*/
