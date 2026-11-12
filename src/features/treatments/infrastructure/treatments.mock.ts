import type { Treatment } from '../domain/treatment'

export const treatmentsMock: Treatment[] = [
  {
    id: 't1',
    name: 'Limpieza Facial',
    category: 'facial',
    description:
      'Limpieza facial con extraccion de comedones, papulas y pustulas con implementacion de aparatologia.',
    durationMinutes: 60,
    price: 150000,
  },
  {
    id: 't2',
    name: 'Masaje relajante',
    category: 'masaje',
    description:
      'Nuestro masaje relajante está diseñado para liberar tensiones musculares, reducir el estrés y brindarte una profunda sensación de descanso y armonía.',
    durationMinutes: 60,
    price: 220000,
  },
  {
    id: 't3',
    name: 'Drenaje linfatico Manual',
    category: 'masaje',
    description:
      'El drenaje linfático manual es una técnica de masaje suave que estimula el movimiento de la linfa, favoreciendo la eliminación del exceso de líquidos y toxinas.',
    durationMinutes: 60,
    price: 220000,
  },
  {
    id: '4',
    name: 'Masaje Moldeador',
    category: 'body',
    description:
      'Una técnica manual que utiliza movimientos firmes y rítmicos para trabajar zonas específicas, ayudando a mejorar temporalmente la apariencia de la piel y a definir visualmente la silueta.',
    durationMinutes: 60,
    price: 220000,
  },
  {
    id: '5',
    name: 'Hidrafacial',
    category: 'facial',
    description:
      'Este tratamiento ayuda a mejorar la apariencia de los poros, aporta luminosidad y deja el rostro con una textura más suave, fresca y radiante.',
    durationMinutes: 60,
    price: 220000,
  },
  {
    id: '6',
    name: 'Masaje Con Piedras Calientes ',
    category: 'masaje',
    description:
      'El calor favorece la relajación de los músculos, mientras que cada movimiento te invita a desconectarte de la rutina, liberar tensiones y disfrutar de un momento de tranquilidad y armonía.',
    durationMinutes: 60,
    price: 220000,
  },
   {
    id: '7',
    name: 'Depilacion laser ',
    category: 'hair-removal',
    description:
      'La depilacion laser remueve el bello de manera efectiva y duradera , dejando la piel suave y libre de irritaciones,brindando comodidad y confianza en cada sesion.',
    durationMinutes: 60,
    price: 50000,
  },
   {
    id: '8',
    name: 'Manos y pies  ',
    category: 'hands-and-feet',
    description:
      'Manicure y Pedicure con productos de alta calidad y tecnicas especializadas para cuidar y embellecer tus manos y pies .', 
    durationMinutes: 60,
    price: 100.000,
  },
]
