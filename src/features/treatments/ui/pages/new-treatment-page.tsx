// useNavigate: permite cambiar de página desde el código (sin que la persona haga clic en un enlace)
import { useNavigate } from 'react-router'

// el formulario y el hook que guarda
import { TreatmentForm } from '../components/treatment-form'
import { useCreateTreatment } from '../hooks/use-create-treatment'

// PÁGINA: crear un tratamiento nuevo
export function NewTreatmentPage() {
  // función para ir a otra página
  const navigate = useNavigate()
  // la "mutación": trae mutate (guardar) e isPending (si está guardando)
  const createMutation = useCreateTreatment()

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-3xl font-semibold">New treatment</h1>
      {/* el formulario reutilizable; la página le dice qué hacer al guardar */}
      <TreatmentForm
        // mientras guarda, el botón se desactiva para no guardar dos veces
        isSaving={createMutation.isPending}
        // al enviar: guarda los datos y, si salió bien, vuelve a la lista
        onSubmit={(values) =>
          createMutation.mutate(values, { onSuccess: () => navigate('/treatments') })
        }
      />
    </main>
  )
}
