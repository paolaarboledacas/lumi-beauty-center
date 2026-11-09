import { createBrowserRouter, Navigate } from 'react-router'
import { AppLayout } from '@/components/common/app-layout'
import { TreatmentsPage } from '@/features/treatments'
import { TreatmentDetailPage } from '@/features/treatments'
import { ClientDetailPage, ClientsPage, EditClientPage, NewClientPage } from '@/features/clients'
import { AppointmentsPage, NewAppointmentPage } from '@/features/appointments'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: 'appointments', element: <AppointmentsPage /> },
      { path: 'appointments/new', element: <NewAppointmentPage /> },
      { path: 'clients', element: <ClientsPage /> },
      { path: 'clients/new', element: <NewClientPage /> },
      { path: 'clients/:id', element: <ClientDetailPage /> },
      { path: 'clients/:id/edit', element: <EditClientPage /> },
      {
        index: true,
        element: <Navigate to="/treatments" replace />,
      },
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
