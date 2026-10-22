import type { Treatment } from '../domain/treatment'
import type { TreatmentRepository } from '../domain/treatment-repository'

export async function getTreatments(repository: TreatmentRepository): Promise<Treatment[]> {
  return repository.findAll()
}
