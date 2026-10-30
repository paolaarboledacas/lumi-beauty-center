// Link: enlace para cambiar de página sin recargar
// useParams: lee los espacios que cambian en la dirección, como el :id
import { Link, useParams } from 'react-router'
// el hook en singular: trae UN solo tratamiento
import { useTreatment } from '../hooks/use-treatments'

// PÁGINA DE DETALLE: muestra un tratamiento según el id de la dirección
export function TreatmentDetailPage() {
  // lee el id de la dirección (en /treatments/2 el id es '2'); si no viene, usa '' (vacío)
  const { id = '' } = useParams()
  // pide ese tratamiento; data se renombra treatment
  const { data: treatment, isLoading } = useTreatment(id)

  // PORTERO 1: si está cargando, muestra el mensaje y no sigue
  if (isLoading) return <p className="p-6">Loading...</p>
  // PORTERO 2: "!" significa "no". Si no hay tratamiento (llegó null), avisa y no sigue
  if (!treatment) return <p className="p-6">Treatment not found.</p>

  return (
    // mx-auto centra la caja; max-w-3xl limita el ancho
    <main className="mx-auto max-w-3xl p-6">
      {/* enlace para volver a la lista */}
      <Link to="/treatments">← Back</Link>
      {/* el nombre del tratamiento como título; las llaves ponen el dato real */}
      <h1 className="text-3xl font-semibold">{treatment.name}</h1>
      {/* your design here */}
    </main>
  )
}
