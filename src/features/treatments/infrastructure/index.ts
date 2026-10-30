// trae la funcion que crea el lugar donde se guardan los tratamientos //
import { createLocalStorageTreatmentRepository } from './local-storage-treatment-repository'
// trae los tratamientos de ejemplo para usarlos al inicio //
import { treatmentsMock } from './treatments.mock'

// aqui se elige donde se guardan los datos de toda la app //
// si se cambia esta linea las paginas siguen funcionando igual //
export const treatmentRepository = createLocalStorageTreatmentRepository(treatmentsMock)