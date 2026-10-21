import type { Treatment } from './treatment'

export interface TreatmentRepository {
  findAll(): Promise<Treatment[]>
  findById(id: string): Promise<Treatment | null>
}
