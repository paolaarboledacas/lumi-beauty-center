// trae la funcion que crea el lugar donde se guardan las citas //
import { createLocalStorageAppointmentRepository } from './local-storage-appointment-repository'
// trae las citas de ejemplo para usarlas al inicio //
import { appointmentsMock } from './appointments.mock'

// aqui se elige donde se guardan las citas de toda la app //
export const appointmentRepository = createLocalStorageAppointmentRepository(appointmentsMock)

/*
  PARA QUE SIRVE ESTE ARCHIVO:
  Decide que archivador usan las citas en toda la app.
  Si un dia se guardan en internet, solo se cambia esta linea.
  CAPA: infrastructure.
*/
