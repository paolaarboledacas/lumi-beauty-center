import type { Appointment, NewAppointment } from './appointment' // importo los tipos de citas para poder usarlos en el contrato//

export interface AppointmentRepository {
  findAll(): Promise<Appointment[]>
  findById(id: string): Promise<Appointment | null>
  create(input: NewAppointment): Promise<Appointment>
  update(appointment: Appointment): Promise<Appointment>
  remove(id: string): Promise<void>
}
