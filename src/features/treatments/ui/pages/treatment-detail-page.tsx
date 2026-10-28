import { Link, useParams } from 'react-router'
import { useTreatment } from '../hooks/use-treatments'

export function TreatmentDetailPage() {
  const { id = '' } = useParams()
  const { data: treatment, isLoading } = useTreatment(id)

  if (isLoading) return <p className="p-6">Loading...</p>
  if (!treatment) return <p className="p-6">Treatment not found.</p>

  return (
    <main className="mx-auto max-w-3xl p-6">
      <Link to="/treatments">← Back</Link>
      <h1 className="text-3xl font-semibold">{treatment.name}</h1>
      {/* your design here */}
    </main>
  )
}
