import { Fragment } from 'react'
import { EllipsisVertical, Pencil, Trash2 } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

export type OrderStatus = 'Confirmado' | 'Enviado'

export type Order = {
  id: number
  status: OrderStatus
  orderDate: string
  doneDate: string
  document: string
  paymentDate: string
  value: string
  expanded?: boolean
}

type OrdersTableProps = {
  orders: Order[]
}

function statusVariant(status: OrderStatus): 'success' | 'warning' {
  return status === 'Enviado' ? 'success' : 'warning'
}

export function OrdersTable({ orders }: OrdersTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200">
      <table className="w-full text-left text-sm">
        <thead className="bg-zinc-50 text-zinc-500">
          <tr>
            <th className="w-10 px-3 py-3 font-medium" />
            <th className="px-3 py-3 font-medium">Status</th>
            <th className="px-3 py-3 font-medium">Data do pedido</th>
            <th className="px-3 py-3 font-medium">Data de conclusao</th>
            <th className="px-3 py-3 font-medium">Num</th>
            <th className="px-3 py-3 font-medium">Documento</th>
            <th className="px-3 py-3 font-medium">Data de pagamento</th>
            <th className="px-3 py-3 font-medium">Valor liquido/bruto</th>
            <th className="px-3 py-3 font-medium">Baixar</th>
            <th className="px-3 py-3 font-medium">Editar</th>
            <th className="px-3 py-3 font-medium">Excluir</th>
            <th className="px-3 py-3 font-medium">Detalhes</th>
          </tr>
        </thead>
        <tbody className="text-zinc-700">
          {orders.map((order, index) => (
            <Fragment key={order.id}>
              <tr className={order.expanded ? 'bg-indigo-500 text-white' : 'border-t border-zinc-200'}>
                <td className="px-3 py-3">
                  <span className="rounded bg-indigo-200 px-2 py-1 text-xs text-indigo-700">
                    {index + 1}
                  </span>
                </td>
                <td className="px-3 py-3">
                  {order.expanded ? (
                    order.status
                  ) : (
                    <Badge status={statusVariant(order.status)}>{order.status}</Badge>
                  )}
                </td>
                <td className="px-3 py-3">{order.orderDate}</td>
                <td className="px-3 py-3">{order.doneDate}</td>
                <td className="px-3 py-3">{order.id}</td>
                <td className="px-3 py-3">{order.document}</td>
                <td className="px-3 py-3">{order.paymentDate}</td>
                <td className="px-3 py-3">{order.value}</td>
                <td className="px-3 py-3">
                  <Button size="sm" variant={order.expanded ? 'light' : 'info'}>
                    Baixar
                  </Button>
                </td>
                <td className="px-3 py-3">
                  <button aria-label="editar">
                    <Pencil size={14} />
                  </button>
                </td>
                <td className="px-3 py-3">
                  <button aria-label="excluir">
                    <Trash2 size={14} className={order.expanded ? 'text-white' : 'text-rose-500'} />
                  </button>
                </td>
                <td className="px-3 py-3">
                  <button aria-label="detalhes">
                    <EllipsisVertical size={14} />
                  </button>
                </td>
              </tr>

              {order.expanded && (
                <tr>
                  <td />
                  <td colSpan={11} className="bg-zinc-50 px-4 py-4">
                    <div className="rounded-lg border border-zinc-200 bg-white p-4">
                      <table className="w-full text-sm text-zinc-600">
                        <thead>
                          <tr className="text-zinc-500">
                            <th className="pb-2 text-left font-medium">Nao</th>
                            <th className="pb-2 text-left font-medium">Nome</th>
                            <th className="pb-2 text-left font-medium">Codigo</th>
                            <th className="pb-2 text-left font-medium">Quantidade</th>
                            <th className="pb-2 text-left font-medium">Patrimonio liquido</th>
                            <th className="pb-2 text-left font-medium">Valor bruto</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="py-1">1</td>
                            <td className="py-1">Bacterias de vidro hibrido M5</td>
                            <td className="py-1">TRANSPORTE</td>
                            <td className="py-1">2</td>
                            <td className="py-1">R$ 305,99</td>
                            <td className="py-1">R$ 376.37</td>
                          </tr>
                          <tr>
                            <td className="py-1">2</td>
                            <td className="py-1">Transporte</td>
                            <td className="py-1">TRANSPORTE</td>
                            <td className="py-1">1</td>
                            <td className="py-1">R$ 305,99</td>
                            <td className="py-1">R$ 376.37</td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="mt-4 flex justify-end">
                        <Button variant="info">Verificar pedidos</Button>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}
