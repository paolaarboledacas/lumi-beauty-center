import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createAppointment } from '../../application/create-appointment'
import type { NewAppointment } from '../../domain/appointment'
import { appointmentRepository } from '../../infrastructure'

// guarda una cita nueva //
export function useCreateAppointment() {
  // trae el lugar donde estan guardados los datos //
  const queryClient = useQueryClient()

  return useMutation({
    // que hacer: recibe los datos del formulario y guarda la cita //
    mutationFn: (values: NewAppointment) => createAppointment(appointmentRepository, values),
    // cuando sale bien, avisa que la lista cambio para que se vuelva a buscar //
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['appointments'] }),
  })
}

/*
  PARA QUE SIRVE ESTE ARCHIVO:
  Es el hook para AGENDAR una cita. Lo usa la pagina de nueva cita.
  Despues de guardar, invalidateQueries marca la agenda como desactualizada
  para que aparezca la cita nueva.
  CAPA: ui (hooks).
*/
