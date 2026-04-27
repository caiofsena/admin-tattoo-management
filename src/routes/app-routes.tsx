import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../pages/login-page'
import { NotFoundPage } from '../pages/not-found-page'
import { OrdersPage } from '../pages/orders-page'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/pedidos" element={<OrdersPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
