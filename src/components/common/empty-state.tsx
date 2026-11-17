import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router'

// lo que recibe: el icono, los textos y a donde lleva el boton //
interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  actionLabel: string
  actionTo: string
}

// mensaje amable cuando una lista no tiene nada //
export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionTo,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed p-10 text-center">
      <Icon className="size-10 text-muted-foreground" />
      <p className="font-semibold">{title}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
      <Link
        to={actionTo}
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
      >
        {actionLabel}
      </Link>
    </div>
  )
}

/*
  PARA QUE SIRVE ESTE ARCHIVO:
  Muestra un mensaje amable cuando una lista esta vacia: un icono,
  un titulo, una explicacion y un boton para crear el primero.
  Lo usan tratamientos, clientas y la agenda, cada una con sus textos.
  CAPA: componentes comunes.
*/
