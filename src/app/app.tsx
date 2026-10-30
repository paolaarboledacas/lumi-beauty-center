import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router'

import { queryClient } from './query-client'
import { router } from './router'

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {' '}
      //Da acceso al almacenamiento de datos //
      <RouterProvider router={router} /> // Da acceso a las rutas que se van a crear en el archivo
      router.tsx//
    </QueryClientProvider>
  )
}
