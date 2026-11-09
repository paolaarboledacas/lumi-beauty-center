import { addMinutes, areIntervalsOverlapping } from 'date-fns'

import type { Appointment, AppointmentStatus } from './appointment'

// calcula la hora de fin: inicio + duracion del tratamiento //
export function calculateEndsAt(startsAt: Date, durationMinutes: number): Date {
  return addMinutes(startsAt, durationMinutes)
}
// revisa si el horario nuevo se cruza con alguna cita (sin contar las canceladas) //
export function hasScheduleConflict(
  candidate: { start: Date; end: Date },
  appointments: Appointment[],
): boolean {
  return appointments
    // las canceladas no ocupan la cabina //
    .filter((appointment) => appointment.status !== 'cancelled')
    // ¿alguna se cruza con el horario nuevo? //
    .some((appointment) =>
      areIntervalsOverlapping(candidate, {
        start: new Date(appointment.startsAt),
        end: new Date(appointment.endsAt),
      }),
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

// devuelve los estados siguientes permitidos //
export function getNextStatuses(status: AppointmentStatus): AppointmentStatus[] {
  return NEXT_STATUSES[status]
}
