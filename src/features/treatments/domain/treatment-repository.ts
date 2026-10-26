import type { NewTreatment, Treatment } from './treatment'

export interface TreatmentRepository {
  findAll(): Promise<Treatment[]>
  findById(id: string): Promise<Treatment | null>
  create(input: NewTreatment): Promise<Treatment>
  update(treatment: Treatment): Promise<Treatment>
}
