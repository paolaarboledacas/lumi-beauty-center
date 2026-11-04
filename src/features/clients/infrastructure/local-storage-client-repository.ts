// trae el molde de la clienta y el contrato //
import type { Client } from '../domain/client'
import type { ClientRepository } from '../domain/client-repository'

// nombre con el que se guardan las clientas en el navegador //
const STORAGE_KEY = 'lumi-clients'

// crea el lugar donde se guardan las clientas (localStorage) //
// seed son las clientas de ejemplo, se usan si no hay nada guardado //
export function createLocalStorageClientRepository(seed: Client[]): ClientRepository {
  // lee las clientas guardadas //
  function read(): Client[] {
    const saved = localStorage.getItem(STORAGE_KEY)
    // si hay algo guardado lo pasa de texto a lista, si no usa las de ejemplo //
    return saved ? (JSON.parse(saved) as Client[]) : seed
  }

  // guarda las clientas, primero las pasa a texto //
  function write(clients: Client[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clients))
  }

  // las 5 cosas que pide el contrato //
  return {
    // devuelve todas las clientas //
    async findAll() {
      return read()
    },

    // busca una clienta por su id, si no la encuentra devuelve null //
    async findById(id) {
      return read().find((c) => c.id === id) ?? null
    },

    // guarda una clienta nueva, copia los datos y le pone un id nuevo //
    async create(input) {
      const client = { ...input, id: crypto.randomUUID() }
      write([...read(), client])
      return client
    },

    // cambia una clienta que ya existe, busca la del mismo id y la reemplaza //
    async update(client) {
      write(read().map((c) => (c.id === client.id ? client : c)))
      return client
    },

    // elimina una clienta por su id //
    async remove(id) {
      // deja todas las clientas menos la que tiene ese id //
      write(read().filter((c) => c.id !== id))
    },
  }
}
