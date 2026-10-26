import type { Treatment } from '../domain/treatment'
import type { TreatmentRepository } from '../domain/treatment-repository'

export async function getTreatmentById(
  repository: TreatmentRepository,
  id: string,
): Promise<Treatment | null> {
  return repository.findById(id)
}
