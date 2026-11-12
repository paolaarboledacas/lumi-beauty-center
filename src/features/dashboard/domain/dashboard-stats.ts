import { isSameDay, isSameWeek } from 'date-fns'

import type { Appointment } from '@/features/appointments'
import type { Treatment } from '@/features/treatments'

// TARJETA 1: citas de hoy que no estan canceladas //
export function countTodayAppointments(appointments: Appointment[], today: Date): number {
  return appointments.filter(
    (appointment) =>
      isSameDay(new Date(appointment.startsAt), today) && appointment.status !== 'cancelled',
  ).length
}

// TARJETA 2: citas que faltan por confirmar //
export function countPendingAppointments(appointments: Appointment[]): number {
  return appointments.filter((appointment) => appointment.status === 'scheduled').length
}

// TARJETA 3: suma de los precios de las citas completadas esta semana //
export function sumWeekIncome(appointments: Appointment[], treatments: Treatment[], today: Date): number {
  return appointments
    .filter(
      (appointment) =>
        appointment.status === 'completed' &&
        isSameWeek(new Date(appointment.startsAt), today, { weekStartsOn: 1 }),
    )
    .reduce((total, appointment) => {
      const treatment = treatments.find((treatment) => treatment.id === appointment.treatmentId)
      // si no encuentra el tratamiento, suma 0 //
      return total + (treatment?.price ?? 0)
    }, 0)
}

// TARJETA 4: los 3 tratamientos con mas citas //
export function getTopTreatments(appointments: Appointment[], treatments: Treatment[]) {
  // cuenta cuantas citas tiene cada tratamiento: { 't1': 5, 't2': 3 } //
  const counts = appointments.reduce<Record<string, number>>((result, appointment) => {
    result[appointment.treatmentId] = (result[appointment.treatmentId] ?? 0) + 1
    return result
  }, {})

  return Object.entries(counts)
    // de mayor a menor cantidad //
    .sort((a, b) => b[1] - a[1])
    // solo los 3 primeros //
    .slice(0, 3)
    // cambia el id por el nombre del tratamiento //
    .map(([treatmentId, count]) => ({
      name: treatments.find((treatment) => treatment.id === treatmentId)?.name ?? 'Tratamiento eliminado',
      count,
    }))
}

/*
  PARA QUE SIRVE ESTE ARCHIVO:
  Son los calculos del tablero de resumen: citas de hoy, por confirmar,
  ingresos de la semana y tratamientos mas pedidos.
  Son funciones puras: reciben las citas y los tratamientos y devuelven un numero o una lista.
  CAPA: domain.
*/
