import { createLocalStorageTreatmentRepository } from './local-storage-treatment-repository'
import { treatmentsMock } from './treatments.mock'

export const treatmentRepository = createLocalStorageTreatmentRepository(treatmentsMock)
