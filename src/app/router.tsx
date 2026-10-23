import { createBrowserRouter, Navigate } from 'react-router'

import { AppLayout } from '@/components/common/app-layout'
import { TreatmentsPage } from '@/features/treatments'
import { TreatmentDetailPage } from '@/features/treatments'

export const router = createBrowserRouter([
{
path: '/',
element: <AppLayout />,
children: [
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
