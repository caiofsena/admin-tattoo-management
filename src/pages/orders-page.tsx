import { useEffect, useState, type FormEvent } from 'react'
import { Calendar, LogOut, Search, UserRound, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { OrdersTable } from '../components/orders/orders-table'
import type { OrderDateSortField, SortDirection } from '../components/orders/orders-table'
import { useAccessUsers } from '../hooks/use-access-users'
import { useOrders, type CreateOrderInput, type Order, type OrderStatus } from '../hooks/use-orders'
import { Button } from '../components/ui/button'

const initialForm: CreateOrderInput = {
  status: 'Confirmado',
  orderDate: '',
  doneDate: '',
  document: '',
  paymentDate: '',
  value: '',
}

const ordersPerPage = 5

function toInputDate(date: string) {
  const [day, month, year] = date.split('-')
  if (!day || !month || !year) return ''
  return `${year}-${month}-${day}`
}

function toDisplayDate(date: string) {
  const [year, month, day] = date.split('-')
  if (!year || !month || !day) return ''
  return `${day}-${month}-${year}`
}

function toDateTimestamp(date: string) {
  const inputDate = toInputDate(date)
  if (!inputDate) return 0
  return new Date(`${inputDate}T00:00:00`).getTime()
}

export function OrdersPage() {
  const navigate = useNavigate()
  const { currentUser, logout } = useAccessUsers()
  const { orders, createOrder, updateOrder, deleteOrder } = useOrders()
  const [form, setForm] = useState<CreateOrderInput>(initialForm)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [orderPendingDeletion, setOrderPendingDeletion] = useState<Order | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState<'Todos' | OrderStatus>('Todos')
  const [orderDateFilter, setOrderDateFilter] = useState('')
  const [doneDateFilter, setDoneDateFilter] = useState('')
  const [paymentDateFilter, setPaymentDateFilter] = useState('')
  const [orderIdFilter, setOrderIdFilter] = useState('')
  const [sortField, setSortField] = useState<OrderDateSortField>('orderDate')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

  const filteredOrders = [...orders]
    .filter((order) => statusFilter === 'Todos' || order.status === statusFilter)
    .filter((order) => !orderDateFilter || toInputDate(order.orderDate) === orderDateFilter)
    .filter((order) => !doneDateFilter || toInputDate(order.doneDate) === doneDateFilter)
    .filter((order) => !paymentDateFilter || toInputDate(order.paymentDate) === paymentDateFilter)
    .filter((order) => !orderIdFilter.trim() || String(order.id).includes(orderIdFilter.trim()))
    .sort((firstOrder, secondOrder) => {
      const firstDate = toDateTimestamp(firstOrder[sortField])
      const secondDate = toDateTimestamp(secondOrder[sortField])

      return sortDirection === 'asc' ? firstDate - secondDate : secondDate - firstDate
    })

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / ordersPerPage))
  const pageStartIndex = (currentPage - 1) * ordersPerPage
  const pageEndIndex = pageStartIndex + ordersPerPage
  const paginatedOrders = filteredOrders.slice(pageStartIndex, pageEndIndex)

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  useEffect(() => {
    setCurrentPage(1)
  }, [
    statusFilter,
    orderDateFilter,
    doneDateFilter,
    paymentDateFilter,
    orderIdFilter,
    sortField,
    sortDirection,
  ])

  function handleChange<K extends keyof CreateOrderInput>(
    key: K,
    value: CreateOrderInput[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function resetForm() {
    setForm(initialForm)
    setEditingId(null)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    
    if (!form.document.trim() || !form.value.trim() || 
    !form.orderDate || !form.doneDate || !form.paymentDate) {
      alert('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    const payload: CreateOrderInput = {
      ...form,
      orderDate: toDisplayDate(form.orderDate),
      doneDate: toDisplayDate(form.doneDate),
      paymentDate: toDisplayDate(form.paymentDate),
    }

    if (editingId) {
      updateOrder(editingId, payload)
    } else {
      createOrder(payload)
    }

    resetForm()
  }

  function handleEdit(order: Order) {
    setEditingId(order.id)
    setForm({
      status: order.status,
      orderDate: toInputDate(order.orderDate),
      doneDate: toInputDate(order.doneDate),
      document: order.document,
      paymentDate: toInputDate(order.paymentDate),
      value: order.value,
    })
  }

  function handleConfirmDelete() {
    if (!orderPendingDeletion) return

    deleteOrder(orderPendingDeletion.id)
    if (editingId === orderPendingDeletion.id) {
      resetForm()
    }
    setOrderPendingDeletion(null)
  }

  function clearFilters() {
    setStatusFilter('Todos')
    setOrderDateFilter('')
    setDoneDateFilter('')
    setPaymentDateFilter('')
    setOrderIdFilter('')
  }

  function handleSort(field: OrderDateSortField) {
    if (sortField === field) {
      setSortDirection((direction) => (direction === 'asc' ? 'desc' : 'asc'))
      return
    }

    setSortField(field)
    setSortDirection('desc')
  }

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-zinc-100 p-4 sm:p-8">
      <main className="mx-auto max-w-7xl rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-6">
        <header className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-semibold text-violet-500">
              Gestão de Tatuagem - Pedidos
            </h1>
            {currentUser ? (
              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-zinc-600">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                  <UserRound size={15} />
                </span>
                <span className="font-medium text-zinc-800">{currentUser.name}</span>
                <span>{currentUser.email}</span>
              </div>
            ) : null}
          </div>
          <Button type="button" variant="light" className="gap-2 self-start" onClick={handleLogout}>
            <LogOut size={15} />
            Sair
          </Button>
        </header>

        <section className="mb-5 grid gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-4 md:grid-cols-6">
          <label className="grid gap-1 text-xs font-medium text-zinc-600">
            Status
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as 'Todos' | OrderStatus)}
              className="h-10 rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-700"
            >
              <option value="Todos">Todos</option>
              <option value="Confirmado">Confirmado</option>
              <option value="Enviado">Enviado</option>
            </select>
          </label>
          <label className="grid gap-1 text-xs font-medium text-zinc-600">
            Data do pedido
            <span className="relative">
              <input
                type="date"
                value={orderDateFilter}
                onChange={(event) => setOrderDateFilter(event.target.value)}
                className="h-10 w-full rounded-md border border-zinc-200 bg-white px-3 pr-9 text-sm text-zinc-700"
              />
              <Calendar size={15} className="pointer-events-none absolute right-3 top-3 text-zinc-400" />
            </span>
          </label>
          <label className="grid gap-1 text-xs font-medium text-zinc-600">
            Data de conclusão
            <span className="relative">
              <input
                type="date"
                value={doneDateFilter}
                onChange={(event) => setDoneDateFilter(event.target.value)}
                className="h-10 w-full rounded-md border border-zinc-200 bg-white px-3 pr-9 text-sm text-zinc-700"
              />
              <Calendar size={15} className="pointer-events-none absolute right-3 top-3 text-zinc-400" />
            </span>
          </label>
          <label className="grid gap-1 text-xs font-medium text-zinc-600">
            Data de pagamento
            <span className="relative">
              <input
                type="date"
                value={paymentDateFilter}
                onChange={(event) => setPaymentDateFilter(event.target.value)}
                className="h-10 w-full rounded-md border border-zinc-200 bg-white px-3 pr-9 text-sm text-zinc-700"
              />
              <Calendar size={15} className="pointer-events-none absolute right-3 top-3 text-zinc-400" />
            </span>
          </label>
          <label className="grid gap-1 text-xs font-medium text-zinc-600">
            Número do pedido
            <span className="relative">
              <input
                inputMode="numeric"
                value={orderIdFilter}
                onChange={(event) => setOrderIdFilter(event.target.value)}
                placeholder="Buscar por ID"
                className="h-10 w-full rounded-md border border-zinc-200 bg-white px-3 pl-9 text-sm text-zinc-700"
              />
              <Search size={15} className="pointer-events-none absolute left-3 top-3 text-zinc-400" />
            </span>
          </label>
          <div className="flex items-end gap-2 md:col-span-1">
            <Button type="button" variant="light" onClick={clearFilters} className='text-violet-500'>
              Limpar filtros
            </Button>
          </div>
        </section>

        <form
          onSubmit={handleSubmit}
          className="mb-6 grid gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-4 md:grid-cols-6"
        >
          <label className="grid gap-1 text-xs font-medium text-zinc-600">
            Status
            <select
              value={form.status}
              onChange={(event) => handleChange('status', event.target.value as OrderStatus)}
              className="h-10 rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-700"
            >
              <option value="Confirmado">Confirmado</option>
              <option value="Enviado">Enviado</option>
            </select>
          </label>
          <label className="grid gap-1 text-xs font-medium text-zinc-600">
            Data do pedido
            <input
              type="date"
              value={form.orderDate}
              onChange={(event) => handleChange('orderDate', event.target.value)}
              className="h-10 rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-700"
            />
          </label>
          <label className="grid gap-1 text-xs font-medium text-zinc-600">
            Data de conclusão
            <input
              type="date"
              value={form.doneDate}
              onChange={(event) => handleChange('doneDate', event.target.value)}
              className="h-10 rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-700"
            />
          </label>
          <label className="grid gap-1 text-xs font-medium text-zinc-600">
            Documento
            <input
              placeholder="Documento"
              maxLength={20}
              value={form.document}
              onChange={(event) => handleChange('document', event.target.value)}
              className="h-10 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-700"
            />
          </label>
          <label className="grid gap-1 text-xs font-medium text-zinc-600">
            Data de pagamento
            <input
              type="date"
              value={form.paymentDate}
              onChange={(event) => handleChange('paymentDate', event.target.value)}
              className="h-10 rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-700"
            />
          </label>
          <label className="grid gap-1 text-xs font-medium text-zinc-600">
            Valor
            <input
              placeholder="Valor"
              value={form.value}
              onChange={(event) => handleChange('value', event.target.value)}
              className="h-10 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-700"
            />
          </label>

          <div className="md:col-span-6 flex gap-2">
            <Button type="submit">{editingId ? 'Salvar edição' : 'Novo pedido'}</Button>
            {editingId ? (
              <Button type="button" variant="secondary" onClick={resetForm}>
                Cancelar
              </Button>
            ) : null}
          </div>
        </form>

        <OrdersTable
          orders={paginatedOrders}
          editingOrderId={editingId}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
          onEditOrder={handleEdit}
          onDeleteOrder={(id) => {
            const order = orders.find((item) => item.id === id)
            if (order) setOrderPendingDeletion(order)
          }}
        />

        <footer className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm text-zinc-500">
          <Button
            type="button"
            variant="light"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
          >
            Anterior
          </Button>
          <span>
            Pagina {currentPage} de {totalPages}
          </span>
          <Button
            type="button"
            variant="light"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
          >
            Proxima
          </Button>
          <span>
            {filteredOrders.length} de {orders.length} pedidos
          </span>
        </footer>
      </main>

      {orderPendingDeletion ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/50 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-order-title"
            className="w-full max-w-md rounded-lg border border-zinc-200 bg-white p-5 text-zinc-800 shadow-xl"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h2 id="delete-order-title" className="text-lg font-semibold text-zinc-950">
                  Remover pedido
                </h2>
                <p className="mt-1 text-sm text-zinc-600">
                  Confirme a exclusao do pedido #{orderPendingDeletion.id}.
                </p>
              </div>
              <button
                type="button"
                aria-label="Fechar modal"
                onClick={() => setOrderPendingDeletion(null)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800"
              >
                <X size={16} />
              </button>
            </div>

            <div className="rounded-md border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-600">
              <span className="font-medium text-zinc-800">
                {orderPendingDeletion.document}
              </span>
              <span className="block">{orderPendingDeletion.value}</span>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <Button
                type="button"
                variant="light"
                onClick={() => setOrderPendingDeletion(null)}
              >
                Cancelar
              </Button>
              <Button type="button" variant="danger" onClick={handleConfirmDelete}>
                Remover
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
