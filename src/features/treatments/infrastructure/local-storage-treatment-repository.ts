import type { Treatment } from '../domain/treatment'
import type { TreatmentRepository } from '../domain/treatment-repository'
const STORAGE_KEY = 'lumi-treatments'

export function createLocalStorageTreatmentRepository(seed: Treatment[]): TreatmentRepository {
  function read(): Treatment[] {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? (JSON.parse(saved) as Treatment[]) : seed
  }

  function write(treatments: Treatment[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(treatments))
  }

  return {
    async findAll() {
      return read()
    },
    async findById(id) {
      return read().find((t) => t.id === id) ?? null
    },
    async create(input) {
      const treatment = { ...input, id: crypto.randomUUID() }
      write([...read(), treatment])
      return treatment
    },
    async update(treatment) {
      write(read().map((t) => (t.id === treatment.id ? treatment : t)))
      return treatment
    },
  }
}
