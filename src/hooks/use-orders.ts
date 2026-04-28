import useLocalStorageModule from 'use-local-storage'

type UseLocalStorage = typeof useLocalStorageModule

const useLocalStorage = (
  (useLocalStorageModule as unknown as { default?: UseLocalStorage }).default ??
  useLocalStorageModule
) as UseLocalStorage

export type OrderStatus = 'Confirmado' | 'Enviado'

export type Order = {
  id: number
  client: string
  status: OrderStatus
  orderDate: string
  doneDate: string
  document: string
  paymentDate: string
  value: string
  expanded?: boolean
}

export type CreateOrderInput = Omit<Order, 'id' | 'expanded'>

const initialOrders: Order[] = [
  {
    id: 1596,
    client: 'João da Silva',
    status: 'Confirmado',
    orderDate: '21-04-2026',
    doneDate: '24-04-2026',
    document: 'TATUAGEM/7/03/2022',
    paymentDate: '24-04-2026',
    value: 'R$ 376.37',
  },
  {
    id: 1595,
    client: 'Maria Oliveira',
    status: 'Confirmado',
    orderDate: '21-04-2026',
    doneDate: '24-04-2026',
    document: 'TATUAGEM/7/03/2022',
    paymentDate: '24-04-2026',
    value: 'R$ 376.37',
  },
  {
    id: 1594,
    client: 'Carlos Santos',
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
    client: 'Ana Costa',
    status: 'Enviado',
    orderDate: '19-04-2026',
    doneDate: '20-04-2026',
    document: 'TATUAGEM/7/03/2022',
    paymentDate: '21-04-2026',
    value: 'R$ 376.37',
  },
]

export function useOrders() {
  const [storedOrders, setOrders] = useLocalStorage<Order[]>('orders-crud', initialOrders)
  const orders = (storedOrders ?? []).map((order) => ({
    ...order,
    client: order.client ?? '',
  }))

  function createOrder(input: CreateOrderInput) {
    const nextId =
      orders.length > 0 ? Math.max(...orders.map((order) => order.id)) + 1 : 1

    setOrders((prev) => [{ id: nextId, ...input, expanded: false }, ...(prev ?? [])])
  }

  function updateOrder(id: number, updates: Partial<CreateOrderInput>) {
    setOrders((prev) =>
      (prev ?? []).map((order) =>
        order.id === id ? { ...order, ...updates } : order,
      ),
    )
  }

  function deleteOrder(id: number) {
    setOrders((prev) => (prev ?? []).filter((order) => order.id !== id))
  }

  function toggleExpanded(id: number) {
    setOrders((prev) =>
      (prev ?? []).map((order) =>
        order.id === id ? { ...order, expanded: !order.expanded } : order,
      ),
    )
  }

  return {
    orders,
    createOrder,
    updateOrder,
    deleteOrder,
    toggleExpanded,
  }
}
