import type { Treatment } from '../domain/treatment'
import type { TreatmentRepository } from '../domain/treatment-repository' // trae el tratamiento y el repositorio , los dos de la capa domain.//
// import type signifa solo traigo la descrpcion no codigo que se ejecute // // ../ significa sube la carpeta desde application sube a treatments y entra a domain //
export async function getTreatmentById( 
  repository: TreatmentRepository, // esta funcion recibe dos datos que se llaman parametros ,repository quuen tiene los datos y id el tratamiento que busco y string es  texto //
  id: string,
): Promise<Treatment | null> {//la funcion devuelve una promesa que puede ser un tratamiento o null si no lo encuentra //
  return repository.findById(id) // le pide al repositorio que busque el tratamiento por id//
}
