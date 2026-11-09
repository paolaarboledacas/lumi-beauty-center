import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateAppointment } from '../../application/update-appointment'
import type { Appointment } from '../../domain/appointment'
import { appointmentRepository } from '../../infrastructure'

// cambia los datos de una cita que ya existe //
export function useUpdateAppointment() {
  // trae el lugar donde estan guardados los datos //
  const queryClient = useQueryClient()

  return useMutation({
    // que hacer: recibe la cita con su id y guarda los cambios //
    mutationFn: (appointment: Appointment) => updateAppointment(appointmentRepository, appointment),
    // cuando sale bien, avisa que la lista cambio para que se vuelva a buscar //
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['appointments'] }),
  })
}

/*
  PARA QUE SIRVE ESTE ARCHIVO:
  Es el hook para CAMBIAR una cita, sobre todo su estado
  (confirmar, completar, cancelar). Lo usan los botones de estado.
  CAPA: ui (hooks).
*/
