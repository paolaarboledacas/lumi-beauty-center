import type { NewTreatment, Treatment } from '../domain/treatment'
import type { TreatmentRepository } from '../domain/treatment-repository'
import { treatmentsMock } from './treatments.mock'

export class InMemoryTreatmentRepository implements TreatmentRepository {
  private treatments: Treatment[] = [...treatmentsMock]

  async findAll(): Promise<Treatment[]> {
    return this.treatments
  }

  async findById(id: string): Promise<Treatment | null> {
    return this.treatments.find((item) => item.id === id) ?? null
  }

  async create(input: NewTreatment): Promise<Treatment> {
    const treatment = { ...input, id: crypto.randomUUID() }
    this.treatments = [...this.treatments, treatment]
    return treatment
  }

  async update(treatment: Treatment): Promise<Treatment> {
    this.treatments = this.treatments.map((t) => (t.id === treatment.id ? treatment : t))
    return treatment
  }
}
