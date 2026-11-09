import { useQuery } from '@tanstack/react-query'

import { getAppointmentById } from '../../application/get-appointment-by-id'
import { getAppointments } from '../../application/get-appointments'
import { appointmentRepository } from '../../infrastructure'

// trae todas las citas, lo usa la agenda //
export function useAppointments() {
  return useQuery({
    // nombre con el que se guarda la lista de citas //
    queryKey: ['appointments'],
    // como se buscan las citas si no estan guardadas //
    queryFn: () => getAppointments(appointmentRepository),
  })
}

// trae una sola cita por su id, lo usa el detalle de la cita //
export function useAppointment(id: string) {
  return useQuery({
    // cada cita se guarda con su id para no mezclarse con la lista //
    queryKey: ['appointments', id],
    queryFn: () => getAppointmentById(appointmentRepository, id),
    // solo busca si hay un id //
    enabled: !!id,
  })
}

/*
  PARA QUE SIRVE ESTE ARCHIVO:
  Son los hooks para LEER citas. Las paginas los usan para pedir los datos
  y saber si esta cargando o si hubo error. useQuery guarda los datos
  para no pedirlos otra vez.
  CAPA: ui (hooks: el puente entre las paginas y las acciones).
*/
