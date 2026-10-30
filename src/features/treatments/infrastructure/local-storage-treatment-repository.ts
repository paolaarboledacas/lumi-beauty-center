// trae la plantilla del tratamiento y el contrato (capa domain)
import type { Treatment } from '../domain/treatment'
import type { TreatmentRepository } from '../domain/treatment-repository'

// nombre de la "página del cuaderno" (localStorage) donde se guardan los tratamientos
// localStorage es un cuaderno del navegador: lo guardado no se borra al recargar
const STORAGE_KEY = 'lumi-treatments'

// crea el archivador que guarda los tratamientos en localStorage
// seed (semilla) = los tratamientos iniciales del mock, se usan si el cuaderno está vacío
// ": TreatmentRepository" = promete cumplir el contrato (las 4 tareas)
export function createLocalStorageTreatmentRepository(seed: Treatment[]): TreatmentRepository {
  // AYUDANTE: lee la lista del cuaderno
  function read(): Treatment[] {
    // busca en el cuaderno lo que hay en la página 'lumi-treatments'
    const saved = localStorage.getItem(STORAGE_KEY)
    // ¿hay algo guardado? si sí → lo convierte de texto a lista (JSON.parse)
    // si no → usa la semilla. "? :" es un si/sino corto (ternario)
    return saved ? (JSON.parse(saved) as Treatment[]) : seed
  }

  // AYUDANTE: guarda la lista en el cuaderno
  function write(treatments: Treatment[]) {
    // localStorage solo guarda texto: JSON.stringify convierte la lista en texto
    localStorage.setItem(STORAGE_KEY, JSON.stringify(treatments))
  }

  // las 4 tareas que exige el contrato
  return {
    // TAREA 1: devuelve todos los tratamientos
    async findAll() {
      return read()
    },

    // TAREA 2: busca uno por su id
    // find recorre la lista y devuelve el primero con ese id
    // "?? null" = si no lo encuentra, devuelve null
    async findById(id) {
      return read().find((t) => t.id === id) ?? null
    },

    // TAREA 3: guarda un tratamiento nuevo
    async create(input) {
      // "...input" copia todos los datos del formulario
      // y se le agrega un id único al azar con crypto.randomUUID()
      const treatment = { ...input, id: crypto.randomUUID() }
      // lista nueva = todos los que ya había (...read()) + el nuevo al final
      write([...read(), treatment])
      // devuelve el tratamiento completo, ya con id
      return treatment
    },

    // TAREA 4: actualiza un tratamiento que ya existe
    async update(treatment) {
      // recorre la lista: si el id coincide pone la versión nueva, si no deja el que estaba
      // por eso update necesita el id: para saber cuál reemplazar
      write(read().map((t) => (t.id === treatment.id ? treatment : t)))
      return treatment
    },
  }
}