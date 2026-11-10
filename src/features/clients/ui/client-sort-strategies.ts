import type { Client } from '../domain/client'

import { SKIN_TYPE_LABELS } from './client-labels'

// las formas de ordenar que existen //
export type SortKey = 'name-asc' | 'name-desc' | 'skin-type' | 'most-alerts'

// una estrategia compara dos clientas y dice cual va primero //
type SortStrategy = (a: Client, b: Client) => number

// cada forma de ordenar es una funcion pequeña (patron Strategy) //
export const SORT_STRATEGIES: Record<SortKey, SortStrategy> = {
  // nombre de la A a la Z //
  'name-asc': (a, b) => a.fullName.localeCompare(b.fullName),
  // nombre de la Z a la A //
  'name-desc': (a, b) => b.fullName.localeCompare(a.fullName),
  // tipo de piel en orden alfabetico (en español) //
  'skin-type': (a, b) => SKIN_TYPE_LABELS[a.skinType].localeCompare(SKIN_TYPE_LABELS[b.skinType]),
  // primero las que tienen mas alertas //
  'most-alerts': (a, b) => b.alerts.length - a.alerts.length,
}

/*
  PARA QUE SIRVE ESTE ARCHIVO:
  Guarda las formas de ordenar la lista de clientas (patron Strategy).
  Cada forma es una funcion pequeña que compara dos clientas:
  si devuelve negativo, la primera va antes; si devuelve positivo, va despues.
  La pagina solo elige una con SORT_STRATEGIES[sortKey], sin usar if.
  Para agregar un orden nuevo, se agrega una linea aqui y una opcion en el selector.
  CAPA: ui.
*/
