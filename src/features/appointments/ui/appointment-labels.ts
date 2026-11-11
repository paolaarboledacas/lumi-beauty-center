import type { AppointmentStatus } from '../domain/appointment'

// texto en español para cada estado //
export const STATUS_LABELS: Record<AppointmentStatus, string> = {
  scheduled: 'Agendada',
  confirmed: 'Confirmada',
  completed: 'Completada',
  cancelled: 'Cancelada',
  'no-show': 'No asistió',
}

// color de cada estado (colores del tema: success, warning, destructive) //
export const STATUS_STYLES: Record<AppointmentStatus, string> = {
  scheduled: 'bg-warning/10 text-warning',
  confirmed: 'bg-success/10 text-success',
  completed: 'bg-muted text-muted-foreground',
  cancelled: 'bg-destructive/10 text-destructive',
  'no-show': 'bg-destructive/10 text-destructive',
}
// texto del boton para pasar a cada estado //
export const STATUS_ACTIONS: Record<AppointmentStatus, string> = {
  scheduled: 'Agendar',
  confirmed: 'Confirmar',
  completed: 'Completar',
  cancelled: 'Cancelar',
  'no-show': 'No asistió',
}
