// useQuery trae los datos y los guarda para no pedirlos otra vez //
import { useQuery } from '@tanstack/react-query'

// trae las funciones que piden la lista o un solo tratamiento //
import { getTreatmentById } from '../../application/get-treatment-by-id'
import { getTreatments } from '../../application/get-treatments'
// trae el lugar de donde salen los datos (localStorage) //
import { treatmentRepository } from '../../infrastructure'

// trae todos los tratamientos, lo usa la pagina de la lista //
export function useTreatments() {
  return useQuery({
    // nombre con el que se guarda la lista //
    queryKey: ['treatments'],
    // como se buscan los tratamientos si no estan guardados //
    queryFn: () => getTreatments(treatmentRepository),
  })
  // devuelve los datos, si esta cargando y si hubo error //
}

// trae un solo tratamiento por su id, lo usa la pagina de detalle //
export function useTreatment(id: string) {
  return useQuery({
    // cada tratamiento se guarda con su id para no mezclarse con la lista //
    queryKey: ['treatments', id],
    // como se busca el tratamiento con ese id //
    queryFn: () => getTreatmentById(treatmentRepository, id),
    // solo busca si hay un id, si esta vacio no hace nada //
    enabled: !!id,
  })
}
