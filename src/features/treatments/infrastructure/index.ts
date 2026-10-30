// trae la función que crea el archivador de localStorage
import { createLocalStorageTreatmentRepository } from './local-storage-treatment-repository'
// trae los tratamientos de ejemplo (mock) para usarlos como semilla
import { treatmentsMock } from './treatments.mock'

// aquí se decide QUÉ archivador usa toda la app
// para cambiar de mock a localStorage solo se cambió esta línea:
// las páginas, hooks y casos de uso siguen igual porque todos cumplen el mismo contrato
export const treatmentRepository = createLocalStorageTreatmentRepository(treatmentsMock)