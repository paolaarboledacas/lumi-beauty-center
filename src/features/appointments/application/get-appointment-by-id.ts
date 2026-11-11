// trae el molde de la cita y el contrato //
import type { Appointment } from '../domain/appointment'
import type { AppointmentRepository } from '../domain/appointment-repository'

// accion: buscar una sola cita por su id //
export async function getAppointmentById(
  repository: AppointmentRepository,
  id: string,
): Promise<Appointment | null> {
  return repository.findById(id)
}

/*
  PARA QUE SIRVE ESTE ARCHIVO:
  Es la accion "busca esta cita". Devuelve la cita o null si no existe.
  La usa el hook useAppointment (singular).
  CAPA: application.
*/
