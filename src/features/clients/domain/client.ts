export type Skintype = 'normal' | 'dry' | 'oily' | 'combination' | 'sensitive' // menu cerrado solo se permite uno de estos 5

export type ClientAlert =
  'pregnancy' | 'lactation' | 'active-acne' | 'rosacea' | 'recent-sun-exposure' | 'skin-allergy'

export interface Client {
  id: string
  fullName: string
  phone: string
  email?: string // signo de pregunta significa que es opcional //
  skintype: Skintype
  alerts: ClientAlert[] // los corchetes significan lista entonces puede tener varias alertas //
  notes?: string
}

export type NewClient = Omit<Client, 'id'>
//una clienta sin id, para el formulario de registro. El id lo pone la app al guardarla.//
