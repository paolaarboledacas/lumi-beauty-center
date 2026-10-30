// trae el molde del tratamiento y el contrato //
import type { Treatment } from '../domain/treatment'
import type { TreatmentRepository } from '../domain/treatment-repository'

// nombre con el que se guardan los tratamientos en el navegador //
const STORAGE_KEY = 'lumi-treatments'

// crea el lugar donde se guardan los tratamientos (localStorage) //
// seed son los tratamientos de ejemplo, se usan si no hay nada guardado //
export function createLocalStorageTreatmentRepository(seed: Treatment[]): TreatmentRepository {
  // lee los tratamientos guardados //
  function read(): Treatment[] {
    const saved = localStorage.getItem(STORAGE_KEY)
    // si hay algo guardado lo pasa de texto a lista, si no usa los de ejemplo //
    return saved ? (JSON.parse(saved) as Treatment[]) : seed
  }

  // guarda los tratamientos, primero los pasa a texto //
  function write(treatments: Treatment[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(treatments))
  }

  // las 4 cosas que pide el contrato //
  return {
    // devuelve todos los tratamientos //
    async findAll() {
      return read()
    },

    // busca un tratamiento por su id, si no lo encuentra devuelve null //
    async findById(id) {
      return read().find((t) => t.id === id) ?? null
    },

    // guarda un tratamiento nuevo //
    async create(input) {
      // copia los datos y le pone un id nuevo //
      const treatment = { ...input, id: crypto.randomUUID() }
      // guarda los que ya habia mas el nuevo //
      write([...read(), treatment])
      return treatment
    },

    // cambia un tratamiento que ya existe //
    async update(treatment) {
      // busca el que tiene el mismo id y lo reemplaza //
      write(read().map((t) => (t.id === treatment.id ? treatment : t)))
      return treatment
    },
  }
}