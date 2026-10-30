// trae las plantillas (con id y sin id) y el contrato del archivador, de la capa domain
import type { NewTreatment, Treatment } from '../domain/treatment'
import type { TreatmentRepository } from '../domain/treatment-repository'

// CASO DE USO (capa application): la acción "crear un tratamiento"
// recibe el archivador (cualquiera que cumpla el contrato) y los datos del formulario SIN id
// promete devolver después el tratamiento completo, ya CON id
export async function createTreatment(
  repository: TreatmentRepository,
  input: NewTreatment,
): Promise<Treatment> {
  // le pide al archivador que lo guarde; el archivador le pone el id
  // si algún día hay una regla (ej: no repetir nombres), se pondría aquí
  return repository.create(input)
}
