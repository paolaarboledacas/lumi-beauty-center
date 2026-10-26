export type TreatmentCategory = 'facial' | 'body' | 'hair-removal' | 'hands-and-feet'

export interface Treatment {
  id: string
  name: string
  category: TreatmentCategory
  description: string
  durationMinutes: number
  price: number
}
export type NewTreatment = Omit<Treatment, 'id'>
