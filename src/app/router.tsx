import { createBrowserRouter, Navigate } from 'react-router'
/* aca trae dos herramientas de la libreria de react router que es createbrowserRouter y navigate que redirige  a otra paguina */
import { AppLayout } from '@/components/common/app-layout'
import { TreatmentsPage } from '@/features/treatments' /* trae la pagina desde el index.ts de features*/
import { TreatmentDetailPage } from '@/features/treatments'

export const router = createBrowserRouter([
  // crea un enrutador de navegador que define las rutas , los corchetes indican que es una lista de rutas //
  {
    path: '/', // la direccion principal de la app//
    element: <AppLayout />, //lo que se muestra en la pagina con la barra lateral ,el logo y el boton de modo oscuro //
    children: [
      //las paginas hijas que se muestras en la pagina //
      {
        index: true, // si entran a la direccion principal mandalos a la lista de tratamientos y no gusrdes la entrada en el historial para que el boton atras funcionen bien // //
        element: <Navigate to="/treatments" replace />,
      },
      {
        path: 'treatments',
        element: <TreatmentsPage />, // en treatments se muestra la lista de tratamientos //
      },
      {
        path: 'treatments/:id',
        element: <TreatmentDetailPage />, // la Página de detalle: sirve para cualquier tratamiento,":id" es un espacio que cambia según el tratamiento que se seleccione y se muestra //
      },
    ],
  },
])
