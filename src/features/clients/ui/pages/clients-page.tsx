import { useState } from 'react'
import { Link } from 'react-router'

import { Badge } from '@/components/ui/badge'
import { ALERT_LABELS, SKIN_TYPE_LABELS } from '../client-labels'
import { SORT_STRATEGIES, type SortKey } from '../client-sort-strategies'
import { useClients } from '../hooks/use-clients'
import { ListSkeleton } from '@/components/common/list-skeleton'
import { ChevronRight, Phone, Search, Users } from 'lucide-react'
import { EmptyState } from '@/components/common/empty-state'

// saca las iniciales del nombre: 'luz marina' → 'LM' //
function getInitials(fullName: string): string {
  return fullName
    .split(' ')
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('')
}

export function ClientsPage() {
  // pide todas las clientas //
  const { data: clients = [], isLoading, error } = useClients()

  // memoria: lo que escriben en el buscador, empieza vacio //
  const [search, setSearch] = useState('')
  // memoria: como se esta ordenando, empieza de la A a la Z //
  const [sortKey, setSortKey] = useState<SortKey>('name-asc')

  // porteros: cargando y error //
  if (isLoading) return <ListSkeleton />
  if (error) return <p className="p-6 text-destructive">{error.message}</p>
  // si no hay ninguna clienta, un mensaje amable //
  if (clients.length === 0) {
    return (
      <main className="flex flex-col gap-4 p-6">
        <h1 className="text-3xl font-semibold">Clientas</h1>
        <EmptyState
          icon={Users}
          title="Todavía no hay clientas"
          description="Registra a tu primera clienta para empezar a llevar sus fichas."
          actionLabel="+ Registrar clienta"
          actionTo="/clients/new"
        />
      </main>
    )
  }

  // el texto en minuscula, para que no importen las mayusculas //
  const text = search.toLowerCase()

  // colador: deja pasar las que tengan el texto en el nombre o en el telefono //
  const filteredClients = clients.filter(
    (client) => client.fullName.toLowerCase().includes(text) || client.phone.includes(search),
  )

  // usa la estrategia elegida para ordenar una copia de la lista //
  const sortedClients = [...filteredClients].sort(SORT_STRATEGIES[sortKey])

  return (
    <main className="flex flex-col gap-6 p-6">
      {/* titulo, cuantas clientas hay y boton para registrar */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Clientas</h1>
          <p className="text-sm text-muted-foreground">
            {clients.length} {clients.length === 1 ? 'clienta' : 'clientas'}
          </p>
        </div>
        <Link
          to="/clients/new"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          + Nueva clienta
        </Link>
      </div>

      {/* buscador con lupa y selector de orden, en la misma fila */}
      <div className="flex flex-wrap gap-2">
        <div className="relative min-w-60 flex-1">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Buscar por nombre o teléfono"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-md border bg-background py-2 pr-3 pl-9"
          />
        </div>
        <select
          value={sortKey}
          onChange={(event) => setSortKey(event.target.value as SortKey)}
          className="rounded-md border bg-background px-3 py-2 text-sm"
        >
          <option value="name-asc">Nombre A → Z</option>
          <option value="name-desc">Nombre Z → A</option>
          <option value="skin-type">Tipo de piel</option>
          <option value="most-alerts">Más alertas primero</option>
        </select>
      </div>

      {/* si nadie coincide, un mensaje amable */}
      {filteredClients.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No hay clientas que coincidan con "{search}".
        </p>
      )}

      {/* una tarjeta por cada clienta, en dos columnas en pantallas grandes */}
      <ul className="grid gap-3 md:grid-cols-2">
        {sortedClients.map((client) => (
          <li key={client.id}>
            <Link
              to={`/clients/${client.id}`}
              className="flex items-start gap-4 rounded-xl border bg-card p-4 transition-shadow hover:shadow-md"
            >
              {/* circulo con las iniciales */}
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                {getInitials(client.fullName)}
              </span>

              {/* datos de la clienta */}
              <div className="flex flex-1 flex-col gap-2">
                <span className="font-semibold capitalize">{client.fullName}</span>
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Phone className="size-3.5" />
                  {client.phone}
                </span>
                {/* tipo de piel y alertas como etiquetas */}
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary">
                    Piel {SKIN_TYPE_LABELS[client.skinType].toLowerCase()}
                  </Badge>
                  {client.alerts.map((alert) => (
                    <Badge key={alert} variant="destructive">
                      {ALERT_LABELS[alert]}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* flecha para indicar que se puede abrir */}
              <ChevronRight className="size-5 self-center text-muted-foreground" />
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
