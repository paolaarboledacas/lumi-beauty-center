// useMutation: para acciones que CAMBIAN datos (crear, editar, borrar)
// useQueryClient: da acceso al almacén de datos (caché) de TanStack Query
import { useMutation, useQueryClient } from '@tanstack/react-query'

// el caso de uso que crea, la plantilla sin id y el archivador que usa la app
import { createTreatment } from '../../application/create-treatment'
import type { NewTreatment } from '../../domain/treatment'
import { treatmentRepository } from '../../infrastructure'

// HOOK: guarda un tratamiento nuevo y avisa que la lista quedó desactualizada
export function useCreateTreatment() {
  // el almacén de datos, para poder decirle qué refrescar
  const queryClient = useQueryClient()

  // useQuery es para LEER datos; useMutation es para CAMBIARLOS
  return useMutation({
    // qué hacer al guardar: recibe los datos del formulario (sin id) y llama al caso de uso
    mutationFn: (values: NewTreatment) => createTreatment(treatmentRepository, values),
    // cuando se guardó bien: marca como viejos los cajones que empiezan por 'treatments'
    // así la lista se vuelve a pedir y aparece el tratamiento nuevo
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['treatments'] }),
  })
}
