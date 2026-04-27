import {
  CalendarClock,
  LayoutDashboard,
  Search,
  Settings,
  Users,
} from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { tv } from 'tailwind-variants'
import { cn } from '../lib/utils'

const navItem = tv({
  base: 'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
  variants: {
    active: {
      true: 'bg-violet-500 text-white',
      false: 'text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100',
    },
  },
})

const menu = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/clientes', label: 'Clientes', icon: Users },
  { to: '/agendamentos', label: 'Agendamentos', icon: CalendarClock },
  { to: '/configuracoes', label: 'Configurações', icon: Settings },
]

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 lg:grid-cols-[260px_1fr]">
        <aside className="border-b border-zinc-800 bg-zinc-900 px-4 py-6 lg:border-b-0 lg:border-r">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-violet-300">
              Fluxo admin
            </p>
            <h1 className="mt-2 text-lg font-semibold">Gestao de Tatuagem</h1>
          </div>

          <nav className="space-y-2">
            {menu.map(({ to, label, icon: Icon }) => (
              <NavLink key={to} to={to}>
                {({ isActive }) => (
                  <span className={cn(navItem({ active: isActive }))}>
                    <Icon size={16} />
                    {label}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </aside>

        <div className="p-4 sm:p-6">
          <header className="mb-6 flex flex-col gap-4 rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-zinc-400">Painel administrativo</p>
              <p className="text-xl font-semibold">Studio Black Crow</p>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-400">
              <Search size={16} />
              <span className="text-sm">Buscar cliente ou agendamento...</span>
            </div>
          </header>

          <Outlet />
        </div>
      </div>
    </div>
  )
}
