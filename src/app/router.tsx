import { createBrowserRouter } from 'react-router'
import { AppLayout } from '@/components/common/app-layout'
import { ClientDetailPage, ClientsPage, EditClientPage, NewClientPage } from '@/features/clients'
import { AppointmentsPage, NewAppointmentPage } from '@/features/appointments'
import { DashboardPage } from '@/features/dashboard'
import { NewTreatmentPage, TreatmentDetailPage, TreatmentsPage } from '@/features/treatments'
export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: 'treatments/new', element: <NewTreatmentPage /> },
      { path: 'appointments', element: <AppointmentsPage /> },
      { path: 'appointments/new', element: <NewAppointmentPage /> },
      { path: 'clients', element: <ClientsPage /> },
      { path: 'clients/new', element: <NewClientPage /> },
      { path: 'clients/:id', element: <ClientDetailPage /> },
      { path: 'clients/:id/edit', element: <EditClientPage /> },
      // la pagina de inicio es el dashboard //
      { index: true, element: <DashboardPage /> },
      {
        path: 'treatments',
        element: <TreatmentsPage />,
      },
      {
        path: 'treatments/:id',
        element: <TreatmentDetailPage />,
      },
    ],
  },
])
