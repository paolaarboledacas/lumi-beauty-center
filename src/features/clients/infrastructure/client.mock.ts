import type { Client } from '../domain/client' // importo el tipo de cliente para poder usarlo en el mock , sube de infrasructure a client.ts y de ahi a domain //

export const clientsMock: Client[] = [
  {
    id: 'c1',
    fullName: 'John Doe',
    phone: '3205263495',
    email: 'john.doe@example.com',
    skintype: 'normal',
    alerts: [],
    notes: 'Regular client',
  },
  {
    id: 'c2',
    fullName: 'luz marina',
    phone: '3001234571',
    // sin correo, para probar que el email es opcional //
    skintype: 'oily',
    alerts: ['skin-allergy'],
    notes: 'Alergia a productos con aceite',
  },
  {
    id: 'c3',
    fullName: 'jeimi suarez',
    phone: '3001234557',
    email: 'jeimi.suarez@gmail.com',
    skintype: 'dry',
    alerts: [],
    // sin notas, para probar que las notas son opcionales //
  },
  {
    id: 'c4',
    fullName: 'jorge castillo',
    phone: '3001234567',
    email: 'jorge.castillo@gmail.com',
    skintype: 'sensitive',
    // varias alertas, para probar la lista //
    alerts: ['rosacea', 'recent-sun-exposure'],
    notes: 'piel sensible y propensa a rosacea',
  },
  {
    id: 'c5',
    fullName: 'Paola farfan',
    phone: '3001734567',
    email: 'paola.farfan@gmail.com',
    skintype: 'combination',
    alerts: ['skin-allergy'],
    notes: 'piel sensible',
  },
]
//este es un mock de clientes es una lista de clientes de ejemplo ya que no he registrado a ninguna //
