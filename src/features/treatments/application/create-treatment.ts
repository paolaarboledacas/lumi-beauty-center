import type { NewTreatment, Treatment } from '../domain/treatment'
import type { TreatmentRepository } from '../domain/treatment-repository'

export async function createTreatment(
  repository: TreatmentRepository,
  input: NewTreatment,
): Promise<Treatment> {
  return repository.create(input)
}
