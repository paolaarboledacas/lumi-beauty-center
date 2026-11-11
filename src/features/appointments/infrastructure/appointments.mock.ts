import type { Appointment } from '../domain/appointment'

// empieza sin citas: se crean desde el formulario //
export const appointmentsMock: Appointment[] = []

/*
  PARA QUE SIRVE ESTE ARCHIVO:
  Son las citas de ejemplo (la semilla) que se usan si no hay nada guardado.
  Esta vacio porque las citas tienen fecha y necesitan ids reales de clientas
  y tratamientos: es mejor crearlas desde el formulario.
  CAPA: infrastructure (de donde vienen los datos).
*/
