// trae el contrato (no necesita el molde: solo recibe un id) //
import type { AppointmentRepository } from '../domain/appointment-repository'

// accion: eliminar una cita por su id //
export async function removeAppointment(repository: AppointmentRepository, id: string): Promise<void> {
  return repository.remove(id)
}

/*
  PARA QUE SIRVE ESTE ARCHIVO:
  Es la accion "elimina esta cita". No devuelve nada (void).
  La guia no pide eliminar citas (se cancelan), pero queda lista por si se necesita.
  CAPA: application.
*/
