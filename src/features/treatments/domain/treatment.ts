export type TreatmentCategory = 'facial' | 'body' | 'hair-removal' | 'hands-and-feet'
//significa que treatmentcategory es un tipo de dato que puede ser facial, body, etec //
export interface Treatment { //significa que treatment es una interfaz que tiene los siguientes datos //
  id: string //identifica el tratamiento //
  name: string //nombre del tratamiento//
  category: TreatmentCategory //categoria del tratamiento//
  description: string // descripcion del tratamiento //
  durationMinutes: number //duracion del tratamiento en minutos //
  price: number // precio //
}
export type NewTreatment = Omit<Treatment, 'id'> //significa que newtreatment es un tipo de dato que tiene todos los datos de treatment menos el id //
