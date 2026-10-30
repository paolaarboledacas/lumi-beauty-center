// QueryClientProvider: el "proveedor" que reparte el almacén de datos a toda la app
import { QueryClientProvider } from '@tanstack/react-query'
// RouterProvider: enciende el mapa de rutas
import { RouterProvider } from 'react-router'

// el almacén de datos (caché) y el mapa de rutas que creamos en esta misma carpeta
import { queryClient } from './query-client'
import { router } from './router'

// App es el componente principal: todo lo demás está adentro de él
export function App() {
  return (
    // Da acceso al almacenamiento de datos a todo lo que está adentro.
    // Si no estuviera, useQuery daría error porque no encuentra dónde guardar.
    <QueryClientProvider client={queryClient}>
      {/* Da acceso a las rutas que se crearon en el archivo router.tsx */}
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
