import { Skeleton } from '@/components/ui/skeleton'

// cajas grises con la forma de una lista, mientras cargan los datos //
export function ListSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <main className="flex flex-col gap-4 p-6">
      {/* la forma del titulo */}
      <Skeleton className="h-9 w-48" />
      {/* la forma de las tarjetas, una por cada fila */}
      {Array.from({ length: rows }).map((_, index) => (
        <Skeleton key={index} className="h-24 w-full rounded-xl" />
      ))}
    </main>
  )
}

/*
  PARA QUE SIRVE ESTE ARCHIVO:
  Muestra cajas grises con la forma de la pagina mientras llegan los datos,
  en vez del texto "Cargando...". Lo usan las listas de tratamientos,
  clientas y la agenda.
  CAPA: componentes comunes (los usan varias features).
*/
