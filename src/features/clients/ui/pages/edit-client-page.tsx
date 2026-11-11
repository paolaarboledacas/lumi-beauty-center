import { useNavigate, useParams } from 'react-router'
import { toast } from 'sonner'

import { ClientForm } from '../components/client-form'
import { useClient } from '../hooks/use-clients'
import { useUpdateClient } from '../hooks/use-update-client'
import { ListSkeleton } from '@/components/common/list-skeleton'

export function EditClientPage() {
  // lee el id de la direccion, por ejemplo /clients/c4/edit //
  const { id = '' } = useParams()
  // busca la clienta para llenar el formulario //
  const { data: client, isLoading } = useClient(id)
  // el hook que guarda los cambios //
  const updateMutation = useUpdateClient()
  // sirve para cambiar de pagina desde el codigo //
  const navigate = useNavigate()

  // porteros: cargando y no encontrada //
     if (isLoading) return <ListSkeleton />
  if (!client) return <p className="p-6">No encontramos esta clienta.</p>

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-3xl font-semibold">Editar clienta</h1>
      <ClientForm
        // el formulario empieza lleno con los datos de la clienta //
        defaultValues={client}
        isSaving={updateMutation.isPending}
        // guarda los cambios con el mismo id y vuelve a la ficha //
        onSubmit={(values) =>
          updateMutation.mutate(
            { ...values, id: client.id },
            {
              // si sale bien: mensaje verde y vuelve a la ficha //
              onSuccess: () => {
                toast.success('Clienta actualizada')
                navigate(`/clients/${client.id}`)
              },
              // si sale mal: mensaje rojo //
              onError: () => toast.error('No se pudo actualizar la clienta'),
            },
          )
        }
      />
    </main>
  )
}
