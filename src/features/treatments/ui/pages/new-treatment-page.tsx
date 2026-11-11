import { useNavigate } from 'react-router'
import { toast } from 'sonner'

import { TreatmentForm } from '../components/treatment-form'
import { useCreateTreatment } from '../hooks/use-create-treatment'

export function NewTreatmentPage() {
  const navigate = useNavigate()
  const createMutation = useCreateTreatment()

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-3xl font-semibold">New treatment</h1>
      <TreatmentForm
        isSaving={createMutation.isPending}
        onSubmit={(values) =>
          createMutation.mutate(values, {
            // si sale bien: mensaje verde y vuelve a la lista //
            onSuccess: () => {
              toast.success('Tratamiento creado')
              navigate('/treatments')
            },
            // si sale mal: mensaje rojo //
            onError: () => toast.error('No se pudo guardar el tratamiento'),
          })
        }
      />
    </main>
  )
}
