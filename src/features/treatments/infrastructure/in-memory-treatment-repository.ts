import type { Treatment } from '../domain/treatment'
import type { TreatmentRepository } from '../domain/treatment-repository'
import { treatmentsMock } from './treatments.mock'

export class InMemoryTreatmentRepository implements TreatmentRepository {
  async findAll(): Promise<Treatment[]> {
    return treatmentsMock
  }

  async findById(id: string): Promise<Treatment | null> {
    const treatment = treatmentsMock.find((item) => item.id === id)
    return treatment || null
  }
}

export const inMemoryTreatmentRepository = new InMemoryTreatmentRepository()
