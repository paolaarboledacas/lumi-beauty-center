import { useNavigate } from 'react-router'

import { ClientForm } from '../components/client-form'
import { useCreateClient } from '../hooks/use-create-client'

export function NewClientPage() {
  // sirve para cambiar de pagina desde el codigo //
  const navigate = useNavigate()
  // el hook que guarda una clienta nueva //
  const createMutation = useCreateClient()

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-3xl font-semibold">Nueva clienta</h1>
      <ClientForm
        // mientras guarda, el boton se apaga //
        isSaving={createMutation.isPending}
        // cuando los datos estan bien: guarda y vuelve a la lista //
        onSubmit={(values) =>
          createMutation.mutate(values, { onSuccess: () => navigate('/clients') })
        }
      />
    </main>
  )
}