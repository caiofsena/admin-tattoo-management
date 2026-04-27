import { Fragment } from 'react'
import { ArrowDown, ArrowUp, ChevronsUpDown, Pencil, Trash2 } from 'lucide-react'
import type { Order, OrderStatus } from '../../hooks/use-orders'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { cn, formatDate } from '../../lib/utils'

type OrdersTableProps = {
  orders: Order[]
  editingOrderId: number | null
  sortField: OrderDateSortField
  sortDirection: SortDirection
  onSort: (field: OrderDateSortField) => void
  onEditOrder: (order: Order) => void
  onDeleteOrder: (id: number) => void
}

export type OrderDateSortField = 'orderDate' | 'doneDate' | 'paymentDate'
export type SortDirection = 'asc' | 'desc'

function statusVariant(status: OrderStatus): 'success' | 'warning' {
  return status === 'Enviado' ? 'success' : 'warning'
}

function SortIcon({
  active,
  direction,
}: {
  active: boolean
  direction: SortDirection
}) {
  if (!active) return <ChevronsUpDown size={14} />

  return direction === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
}

function SortableHeader({
  children,
  field,
  sortField,
  sortDirection,
  onSort,
}: {
  children: string
  field: OrderDateSortField
  sortField: OrderDateSortField
  sortDirection: SortDirection
  onSort: (field: OrderDateSortField) => void
}) {
  const active = sortField === field

  return (
    <button
      type="button"
      onClick={() => onSort(field)}
      className={cn(
        'inline-flex items-center gap-1 text-left font-medium hover:text-zinc-800',
        active && 'text-indigo-600',
      )}
    >
      {children}
      <SortIcon active={active} direction={sortDirection} />
    </button>
  )
}

export function OrdersTable({
  orders,
  editingOrderId,
  sortField,
  sortDirection,
  onSort,
  onEditOrder,
  onDeleteOrder,
}: OrdersTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200">
      <table className="w-full text-left text-sm">
        <thead className="bg-zinc-50 text-zinc-500">
          <tr>
            <th className="px-3 py-3 font-medium">ID</th>
            <th className="px-3 py-3 font-medium">Status</th>
            <th className="px-3 py-3 font-medium">
              <SortableHeader
                field="orderDate"
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={onSort}
              >
                Data do pedido
              </SortableHeader>
            </th>
            <th className="px-3 py-3 font-medium">
              <SortableHeader
                field="doneDate"
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={onSort}
              >
                Data de conclusão
              </SortableHeader>
            </th>
            <th className="px-3 py-3 font-medium">Documento</th>
            <th className="px-3 py-3 font-medium">
              <SortableHeader
                field="paymentDate"
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={onSort}
              >
                Data de pagamento
              </SortableHeader>
            </th>
            <th className="px-3 py-3 font-medium">Valor liquido/bruto</th>
            <th className="px-3 py-3 font-medium">Baixar</th>
            <th className="px-3 py-3 font-medium">Editar</th>
            <th className="px-3 py-3 font-medium">Excluir</th>
          </tr>
        </thead>
        <tbody className="text-zinc-700">
          {orders.map((order, _) => (
            <Fragment key={order.id}>
              <tr
                className={cn(
                  'border-t border-zinc-200',
                  editingOrderId === order.id &&
                    'bg-amber-50 text-zinc-900 ring-2 ring-inset ring-amber-300',
                )}
              >
                <td className="px-3 py-3 font-medium">{order.id}</td>
                <td className="px-3 py-3">
                  <Badge status={statusVariant(order.status)}>{order.status}</Badge>
                </td>
                <td className="px-3 py-3">{formatDate(order.orderDate)}</td>
                <td className="px-3 py-3">{formatDate(order.doneDate)}</td>
                <td className="px-3 py-3">{order.document}</td>
                <td className="px-3 py-3">{formatDate(order.paymentDate)}</td>
                <td className="px-3 py-3">{order.value}</td>
                <td className="px-3 py-3">
                  <Button size="sm" variant={'info'}>
                    Baixar
                  </Button>
                </td>
                <td className="px-3 py-3">
                  <Button aria-label="editar" onClick={() => onEditOrder(order)} className='bg-transparent hover:bg-transparent'>
                    <Pencil 
                      size={14}
                      className='text-violet-500'
                     />
                  </Button>
                </td>
                <td className="px-3 py-3">
                  <Button aria-label="excluir" onClick={() => onDeleteOrder(order.id)} className='bg-transparent hover:bg-transparent'>
                    <Trash2
                      size={14}
                      className='text-rose-500'
                    />
                  </Button>
                </td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}
