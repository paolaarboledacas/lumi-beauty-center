import type { TreatmentCategory } from '../domain/treatment'

// texto en español para cada categoria //
export const CATEGORY_LABELS: Record<TreatmentCategory, string> = {
  facial: 'Facial',
  body: 'Corporal',
  'hair-removal': 'Depilación',
  'hands-and-feet': 'Manos y pies',
  masaje:  'masaje',
  }

// imagen de cada categoria (estan en la carpeta public/treatments) //
export const CATEGORY_IMAGES: Record<TreatmentCategory, string> = {
  facial: '/treatments/facial.jpg',
  body: '/treatments/body.jpg',
  'hair-removal': '/treatments/hair-removal.jpg',
  'hands-and-feet': '/treatments/hands-and-feet.jpg',
  masaje: '/treatments/masaje.jpg',
 }