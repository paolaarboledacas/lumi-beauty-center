// trae el molde de la cita y el contrato //
import type { Appointment } from '../domain/appointment'
import type { AppointmentRepository } from '../domain/appointment-repository'

// accion: guardar los cambios de una cita que ya existe //
export async function updateAppointment(
  repository: AppointmentRepository,
  appointment: Appointment,
): Promise<Appointment> {
  return repository.update(appointment)
}

/*
  PARA QUE SIRVE ESTE ARCHIVO:
  Es la accion "cambia esta cita". Se usa sobre todo para cambiar su estado
  (confirmar, completar, cancelar...). Necesita el id para saber cual cambiar.
  CAPA: application.
*/
