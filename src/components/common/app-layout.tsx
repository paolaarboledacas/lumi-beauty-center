import { NavLink, Outlet } from 'react-router'

import { cn } from '@/lib/utils'

import { ThemeToggle } from './theme-toggle'

const LINKS = [{ to: '/treatments', label: 'Treatments' }]

export function AppLayout() {
  return (
    <div className="min-h-svh md:grid md:grid-cols-[220px_1fr]">
      <aside className="flex items-center justify-between gap-4 border-b bg-sidebar p-4 md:flex-col md:items-stretch md:justify-start md:border-r md:border-b-0">
        <span className="font-heading text-2xl font-semibold">Lumi</span>
        <nav className="flex gap-1 md:flex-col">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn('rounded-md px-3 py-2 text-sm font-medium hover:bg-sidebar-accent', isActive && 'bg-sidebar-accent text-primary')
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <ThemeToggle />
      </aside>
      <Outlet />
    </div>
  )
}