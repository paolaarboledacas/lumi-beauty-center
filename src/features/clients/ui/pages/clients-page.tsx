import { useState } from 'react'
import { Link } from 'react-router'

import { Badge } from '@/components/ui/badge'
import { ALERT_LABELS, SKIN_TYPE_LABELS } from '../client-labels'
import { SORT_STRATEGIES, type SortKey } from '../client-sort-strategies'
import { useClients } from '../hooks/use-clients'

export function ClientsPage() {
  // pide todas las clientas //
  const { data: clients = [], isLoading, error } = useClients()

  // memoria: lo que escriben en el buscador, empieza vacio //
  const [search, setSearch] = useState('')
  // memoria: como se esta ordenando, empieza de la A a la Z //
  const [sortKey, setSortKey] = useState<SortKey>('name-asc')

  // porteros: cargando y error //
  if (isLoading) return <p className="p-6">Cargando...</p>
  if (error) return <p className="p-6 text-destructive">{error.message}</p>

  // el texto en minuscula, para que no importen las mayusculas //
  const text = search.toLowerCase()

  // colador: deja pasar las que tengan el texto en el nombre o en el telefono //
  const filteredClients = clients.filter(
    (client) => client.fullName.toLowerCase().includes(text) || client.phone.includes(search),
  )

  // usa la estrategia elegida para ordenar una copia de la lista //
  const sortedClients = [...filteredClients].sort(SORT_STRATEGIES[sortKey])

  return (
    <main className="flex flex-col gap-4 p-6">
      {/* titulo y enlace para crear una nueva */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Clientas</h1>
        <Link to="/clients/new" className="text-sm font-semibold text-primary">
          + Nueva clienta
        </Link>
      </div>
      {/* buscador: input controlado */}
      <input
        type="search"
        placeholder="Buscar por nombre o teléfono"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className="rounded-md border px-3 py-2"
      />

      {/* selector para elegir como ordenar */}
      <select
        value={sortKey}
        onChange={(event) => setSortKey(event.target.value as SortKey)}
        className="w-fit rounded-md border px-3 py-2 text-sm"
      >
        <option value="name-asc">Nombre A → Z</option>
        <option value="name-desc">Nombre Z → A</option>
        <option value="skin-type">Tipo de piel</option>
        <option value="most-alerts">Más alertas primero</option>
      </select>

      {/* si nadie coincide, un mensaje amable */}
      {filteredClients.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No hay clientas que coincidan con "{search}".
        </p>
      )}
      {/* una tarjeta por cada clienta */}
      <ul className="grid gap-3">
        {sortedClients.map((client) => (
          <li key={client.id}>
            <Link
              to={`/clients/${client.id}`}
              className="flex flex-col gap-2 rounded-xl border p-4"
            >
              <span className="font-semibold">{client.fullName}</span>
              <span className="text-sm text-muted-foreground">
                {client.phone} · Piel {SKIN_TYPE_LABELS[client.skinType]}
              </span>
              {/* las alertas como etiquetas */}
              <div className="flex flex-wrap gap-1">
                {client.alerts.map((alert) => (
                  <Badge key={alert} variant="destructive">
                    {ALERT_LABELS[alert]}
                  </Badge>
                ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
