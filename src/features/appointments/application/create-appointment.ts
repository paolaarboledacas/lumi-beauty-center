// trae los moldes de la cita y el contrato //
import type { Appointment, NewAppointment } from '../domain/appointment'
import type { AppointmentRepository } from '../domain/appointment-repository'

// accion: guardar una cita nueva //
export async function createAppointment(
  repository: AppointmentRepository,
  input: NewAppointment,
): Promise<Appointment> {
  return repository.create(input)
}

/*
  PARA QUE SIRVE ESTE ARCHIVO:
  Es la accion "agenda esta cita". Recibe la cita sin id y la devuelve con id.
  Si el centro tuviera mas reglas al agendar, irian aqui.
  CAPA: application.
*/
