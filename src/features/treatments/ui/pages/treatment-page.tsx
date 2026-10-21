// UI layer: pages.
// A page is a full screen. It gets its data from a hook and decides what to
// show in each situation: loading, error, empty list or the list itself.

import { TreatmentCard } from '../components/treatment-card'
import { useTreatments } from '../hooks/use-treatments'

export function TreatmentPage() {
  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-4 p-6">
      <h1 className="text-2xl font-semibold">Treatments</h1>
      <TreatmentsList />
    </main>
  )
}

function TreatmentsList() {
  const { treatments, isLoading, error } = useTreatments()

  if (isLoading) {
    return <p className="text-muted-foreground">Loading treatments...</p>
  }

  if (error) {
    return (
      <p role="alert" className="text-destructive">
        {error}
      </p>
    )
  }

  if (treatments.length === 0) {
    return <p className="text-muted-foreground">There are no treatments yet.</p>
  }

  return (
    <ul className="flex flex-col gap-3">
      {treatments.map((treatment) => (
        <li key={treatment.id}>
          <TreatmentCard treatment={treatment} />
        </li>
      ))}
    </ul>
  )
}
