// trae el molde de la cita y el contrato //
import type { Appointment } from '../domain/appointment'
import type { AppointmentRepository } from '../domain/appointment-repository'

// nombre con el que se guardan las citas en el navegador //
const STORAGE_KEY = 'lumi-appointments'

// crea el lugar donde se guardan las citas (localStorage) //
// seed son las citas de ejemplo, se usan si no hay nada guardado //
export function createLocalStorageAppointmentRepository(
  seed: Appointment[],
): AppointmentRepository {
  // lee las citas guardadas //
  function read(): Appointment[] {
    const saved = localStorage.getItem(STORAGE_KEY)
    // si hay algo guardado lo pasa de texto a lista, si no usa las de ejemplo //
    return saved ? (JSON.parse(saved) as Appointment[]) : seed
  }

  // guarda las citas, primero las pasa a texto //
  function write(appointments: Appointment[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments))
  }

  // las 5 cosas que pide el contrato //
  return {
    // devuelve todas las citas //
    async findAll() {
      return read()
    },

    // busca una cita por su id, si no la encuentra devuelve null //
    async findById(id) {
      return read().find((a) => a.id === id) ?? null
    },

    // guarda una cita nueva, copia los datos y le pone un id nuevo //
    async create(input) {
      const appointment = { ...input, id: crypto.randomUUID() }
      write([...read(), appointment])
      return appointment
    },

    // cambia una cita que ya existe, busca la del mismo id y la reemplaza //
    async update(appointment) {
      write(read().map((a) => (a.id === appointment.id ? appointment : a)))
      return appointment
    },

    // elimina una cita por su id //
    async remove(id) {
      // deja todas las citas menos la que tiene ese id //
      write(read().filter((a) => a.id !== id))
    },
  }
}

/*
  PARA QUE SIRVE ESTE ARCHIVO:
  Es el archivador de verdad: cumple el contrato y guarda las citas
  en el navegador (localStorage) con la clave 'lumi-appointments'.
  Es importante que la clave sea distinta a 'lumi-clients' y 'lumi-treatments'
  para que no se borren entre si.
  CAPA: infrastructure.
*/
