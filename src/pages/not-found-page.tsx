import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'

export function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-xl items-center justify-center px-4">
      <Card className="w-full text-center">
        <h2 className="text-2xl font-semibold">Pagina nao encontrada</h2>
        <p className="mt-2 text-zinc-300">A rota acessada nao existe no fluxo admin.</p>
        <Link to="/pedidos" className="mt-4 inline-flex">
          <Button>Voltar para dashboard</Button>
        </Link>
      </Card>
    </div>
  )
}
