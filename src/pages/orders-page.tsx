import { Calendar, Filter, Search } from 'lucide-react'
import { OrdersTable, type Order } from '../components/orders/orders-table'
import { Button } from '../components/ui/button'

const orders = [
  {
    id: 1596,
    status: 'Confirmado',
    orderDate: '21-04-2026',
    doneDate: '24-04-2026',
    document: 'TATUAGEM/7/03/2022',
    paymentDate: '24-04-2026',
    value: 'R$ 376.37',
  },
  {
    id: 1595,
    status: 'Confirmado',
    orderDate: '21-04-2026',
    doneDate: '24-04-2026',
    document: 'TATUAGEM/7/03/2022',
    paymentDate: '24-04-2026',
    value: 'R$ 376.37',
  },
  {
    id: 1594,
    status: 'Confirmado',
    orderDate: '24-04-2026',
    doneDate: '25-04-2026',
    document: 'TATUAGEM/7/03/2022',
    paymentDate: '21-03-2022',
    value: '305.99/376.37 PLN',
    expanded: true,
  },
  {
    id: 1593,
    status: 'Enviado',
    orderDate: '19-04-2026',
    doneDate: '20-04-2026',
    document: 'TATUAGEM/7/03/2022',
    paymentDate: '21-04-2026',
    value: 'R$ 376.37',
  },
] satisfies Order[]

export function OrdersPage() {
  return (
    <div className="min-h-screen bg-zinc-100 p-4 sm:p-8">
      <main className="mx-auto max-w-7xl rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-6">
        <header className="mb-6">
          <h1 className="text-4xl font-semibold text-rose-500">
            Gestao de Tatuagem - Total de pedidos
          </h1>
        </header>

        <section className="mb-5 flex flex-wrap items-center gap-3">
          <button className="flex h-11 items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-4 text-sm text-zinc-600">
            Status
          </button>
          <button className="flex h-11 items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-4 text-sm text-zinc-600">
            Data do pedido <Calendar size={15} />
          </button>
          <button className="flex h-11 items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-4 text-sm text-zinc-600">
            Data de fech. <Calendar size={15} />
          </button>
          <button className="flex h-11 items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-4 text-sm text-zinc-600">
            <Search size={15} />
            Numero do pedido
          </button>
          <Button className="ml-auto gap-2" variant="info">
            <Filter size={14} />
            Filtros
          </Button>
        </section>

        <OrdersTable orders={orders} />

        <footer className="mt-5 flex items-center justify-center gap-5 text-sm text-zinc-500">
          <span>Page</span>
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500 text-white">
            1
          </span>
          <span>30</span>
        </footer>
      </main>
    </div>
  )
}
