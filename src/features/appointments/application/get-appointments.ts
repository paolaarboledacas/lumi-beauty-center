// trae el molde de la cita y el contrato //
import type { Appointment } from '../domain/appointment'
import type { AppointmentRepository } from '../domain/appointment-repository'

// accion: pedir todas las citas //
export async function getAppointments(repository: AppointmentRepository): Promise<Appointment[]> {
  return repository.findAll()
}

/*
  PARA QUE SIRVE ESTE ARCHIVO:
  Es la accion "dame todas las citas". La usa el hook useAppointments.
  CAPA: application (lo que puede hacer la app). Las paginas no le hablan
  directo al archivador: pasan por estas acciones.
*/
