// useQuery: el asistente que pide los datos y los guarda en el almacén (caché)//
import { useQuery } from '@tanstack/react-query'

// los casos de uso (application): saben pedir la lista o un solo tratamiento//
import { getTreatmentById } from '../../application/get-treatment-by-id'
import { getTreatments } from '../../application/get-treatments'
// el repositorio: de dónde vienen los datos (hoy, localStorage)//
import { treatmentRepository } from '../../infrastructure'

// trae la LISTA COMPLETA de tratamientos//
// lo usa la página de la lista (TreatmentsPage)
export function useTreatments() {
  return useQuery({
    // etiqueta del cajón donde se guarda la lista en el almacén//
    queryKey: ['treatments'],
    // instrucciones para traer los datos si el cajón está vacío//
    queryFn: () => getTreatments(treatmentRepository),
  })
  // devuelve: data (los datos), isLoading (cargando) y error (si falló)//
}

// trae UN SOLO tratamiento según su id
// lo usa la página de detalle (TreatmentDetailPage)//
export function useTreatment(id: string) {
  return useQuery({
    // cada tratamiento tiene su propio cajón, por eso la etiqueta incluye el id//
    // ej: ['treatments', '2']. Si usara solo ['treatments'] se mezclaría con la lista//
    queryKey: ['treatments', id],
    // instrucciones para buscar el tratamiento con ese id//
    queryFn: () => getTreatmentById(treatmentRepository, id),
    // solo busca si hay un id; si está vacío no hace nada//
    // !! convierte el id en sí (true) o no (false)//
    enabled: !!id,
  })
}
