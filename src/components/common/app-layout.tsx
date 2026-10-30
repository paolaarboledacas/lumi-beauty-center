import { NavLink, Outlet } from 'react-router' // navlink es un enlace del menu y outlet es un espacio donde se pone la paguina hija //

import { cn } from '@/lib/utils' // cn es una ayuda para combinar clases de tawilwind //

import { ThemeToggle } from './theme-toggle' // el boton de modo oscuro //

const LINKS = [{ to: '/treatments', label: 'Treatments' }] // es una lista con las opciones del menu lateral , to es la direccion que se lleva y label es en texto que se ve //

export function AppLayout() {
  // applayout es mayusaculas en ingles //
  return (
    <div className="min-h-svh md:grid md:grid-cols-[220px_1fr]">
      {/* este div es el contenedor principal de la aplicacion en pantallas grandes se devide en dos columnas una de 220px y otra que ocupa el resto del espacio */}
      <aside className="flex items-center justify-between gap-4 border-b bg-sidebar p-4 md:flex-col md:items-stretch md:justify-start md:border-r md:border-b-0">
        {' '}
        // es una etequita de html para una barra lateral //
        <span className="font-heading text-2xl font-semibold">Lumi</span>{' '}
        {/*este es para dat al nombre lumi un estilo y fuente de 2xl y en negrilla */}
        <nav className="flex gap-1 md:flex-col">
          {' '}
          {/* bloque  */}
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={
                ({ isActive }) =>
                  cn(
                    'rounded-md px-3 py-2 text-sm font-medium hover:bg-sidebar-accent',
                    isActive && 'bg-sidebar-accent text-primary',
                  )
                //isactive es una propiedad que indica si el enlace esta avtivo o no//
                //este cn junta todas las clases//
                //signifiaca que si esta activo entonces agrege tal fondo y tal color y si no esta activo no agrega nada//
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>{' '}
        // fin de bloque navlink enlace que cambia de pagina sin recargar todo//
        <ThemeToggle /> // el boton de modo oscuro que se muestra en la barra lateral //
      </aside>
      <Outlet /> // el outlet es un espacio donde se pone la paguina hija segun la url//
    </div>
  )
}
