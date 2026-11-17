import { useMemo } from 'react'

import { ListSkeleton } from '@/components/common/list-skeleton'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAppointments } from '@/features/appointments'
import { useTreatments } from '@/features/treatments'

import {
  countPendingAppointments,
  countTodayAppointments,
  getTopTreatments,
  sumWeekIncome,
} from '../../domain/dashboard-stats'

// formato de pesos colombianos, sin decimales: $ 590.000 //
const money = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

export function DashboardPage() {
  // pide las citas y los tratamientos //
  const { data: appointments = [], isLoading: loadingAppointments } = useAppointments()
  const { data: treatments = [], isLoading: loadingTreatments } = useTreatments()

  // hace los calculos solo cuando cambian las citas o los tratamientos //
  const stats = useMemo(() => {
    const today = new Date()
    return {
      today: countTodayAppointments(appointments, today),
      pending: countPendingAppointments(appointments),
      income: sumWeekIncome(appointments, treatments, today),
      top: getTopTreatments(appointments, treatments),
    }
  }, [appointments, treatments])

  // portero: mientras carga cualquiera de los dos //
  if (loadingAppointments || loadingTreatments) return <ListSkeleton />

  return (
    <main className="flex flex-col gap-6 p-6">
      <h1 className="text-3xl font-semibold">Inicio</h1>

      {/* las 3 tarjetas con numeros */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>Citas de hoy</CardDescription>
            <CardTitle className="text-3xl">{stats.today}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Por confirmar</CardDescription>
            <CardTitle className="text-3xl">{stats.pending}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Ingresos de la semana</CardDescription>
            <CardTitle className="text-3xl">{money.format(stats.income)}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* tratamientos mas pedidos */}
      <Card>
        <CardHeader>
          <CardTitle>Tratamientos más pedidos</CardTitle>
        </CardHeader>
        <CardContent>
          {stats.top.length === 0 ? (
            <p className="text-sm text-muted-foreground">Todavía no hay citas agendadas.</p>
          ) : (
            <ol className="grid gap-2">
              {stats.top.map((item, index) => (
                <li key={item.name} className="flex justify-between">
                  <span>
                    {index + 1}. {item.name}
                  </span>
                  <span className="text-muted-foreground">{item.count} citas</span>
                </li>
              ))}
            </ol>
          )}
        </CardContent>
      </Card>
    </main>
  )
}

/*
  PARA QUE SIRVE ESTE ARCHIVO:
  Es la pagina de inicio con el resumen del centro: citas de hoy, por confirmar,
  ingresos de la semana y tratamientos mas pedidos.
  Pide los datos a citas y tratamientos (por su index.ts) y usa los calculos
  de domain/dashboard-stats.ts. useMemo evita repetir los calculos sin necesidad.
  CAPA: ui (pages).
*/
