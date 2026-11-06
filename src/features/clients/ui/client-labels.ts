import type { ClientAlert, SkinType } from '../domain/client'

// texto en español para cada tipo de piel //
export const SKIN_TYPE_LABELS: Record<SkinType, string> = {
  normal: 'Normal',
  dry: 'Seca',
  oily: 'Grasa',
  combination: 'Mixta',
  sensitive: 'Sensible',
}

// texto en español para cada alerta //
export const ALERT_LABELS: Record<ClientAlert, string> = {
  pregnancy: 'Embarazo',
  lactation: 'Lactancia',
  'active-acne': 'Acné activo',
  rosacea: 'Rosácea',
  'recent-sun-exposure': 'Exposición al sol',
  'skin-allergy': 'Alergia en la piel',
}
