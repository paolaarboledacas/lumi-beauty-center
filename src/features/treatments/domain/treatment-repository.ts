import type { NewTreatment, Treatment } from './treatment' // trae las plantillas de treatment y newtreatment del archivo treatment.ts//

// export inteface , contrato : lo que debe saber hacer cualquier archivador de tratamientos //
export interface TreatmentRepository {
  // findall dame todos los tratamientos //
  findAll(): Promise<Treatment[]>
  //findall busca uno por su id,si no lo encuentras devuelve null//
  findById(id: string): Promise<Treatment | null>
  // create gurda uno nuevo y devuelve el tratamiento creado //
  create(input: NewTreatment): Promise<Treatment>
  //upadate actualiza un tratamiento que ya existe , necesita e id para saber cual cambiar y devuelve el tatamiento actualizado//
  update(treatment: Treatment): Promise<Treatment>
}
