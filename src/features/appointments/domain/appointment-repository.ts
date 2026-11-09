// trae los moldes de la cita para usarlos en el contrato //
import type { Appointment, NewAppointment } from './appointment'

// contrato: lo que debe saber hacer el lugar donde se guardan las citas //
export interface AppointmentRepository {
  // devuelve todas las citas //
  findAll(): Promise<Appointment[]>
  // busca una cita por su id, si no existe devuelve null //
  findById(id: string): Promise<Appointment | null>
  // guarda una cita nueva: entra sin id y sale con id //
  create(input: NewAppointment): Promise<Appointment>
  // cambia una cita que ya existe (por ejemplo su estado) //
  update(appointment: Appointment): Promise<Appointment>
  // elimina una cita, no devuelve nada //
  remove(id: string): Promise<void>
}

/*
  PARA QUE SIRVE ESTE ARCHIVO:
  Es la lista de tareas que debe cumplir el archivador de citas.
  No guarda nada: quien guarda de verdad es local-storage-appointment-repository.ts.
  Gracias al contrato se puede cambiar donde se guardan las citas
  sin tocar las paginas ni los hooks.
  CAPA: domain.
*/
