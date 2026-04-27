import { Eye, WandSparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'

export function LoginPage() {
  return (
    <div className="grid min-h-screen grid-cols-1 bg-zinc-100 lg:grid-cols-2">
      <section className="relative hidden lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#52525b_0,#18181b_45%,#09090b_100%)]" />
        <div className="absolute inset-0 bg-black/25" />
        <p className="absolute bottom-6 left-8 text-sm text-zinc-200">
          Photo by Alex P on Unsplash
        </p>
      </section>

      <section className="flex items-center justify-center p-6 lg:p-10">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
          <div className="mb-8 flex items-center gap-3">
            <WandSparkles className="text-indigo-500" size={20} />
            <p className="text-sm font-semibold text-zinc-700">Login de Acesso</p>
          </div>

          <h1 className="text-3xl font-semibold text-zinc-900">Bom te ver novamente</h1>

          <form className="mt-8 space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm text-zinc-600">Acesso</span>
              <input
                type="email"
                placeholder="Digite seu e-mail"
                className="h-11 w-full rounded-md border border-zinc-200 bg-zinc-50 px-3 text-zinc-800 outline-none transition focus:border-indigo-400"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-zinc-600">Senha</span>
              <div className="flex h-11 items-center rounded-md border border-zinc-200 bg-zinc-50 px-3">
                <input
                  type="password"
                  placeholder="Digite a senha"
                  className="w-full bg-transparent text-zinc-800 outline-none"
                />
                <Eye size={16} className="text-zinc-500" />
              </div>
            </label>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-zinc-600">
                <input type="checkbox" className="h-4 w-4 rounded border-zinc-300" />
                Salvar as informacoes
              </label>
              <button type="button" className="text-cyan-600 hover:text-cyan-500">
                Esqueceu a senha?
              </button>
            </div>

            <Button className="w-full" variant="danger">
              Ingressar a Conta
            </Button>

            <div className="my-3 h-px bg-zinc-200" />

            <Button className="w-full gap-2" variant="secondary">
              <span className="text-base">G</span>
              Conectar com o Google
            </Button>
          </form>

          <p className="mt-7 text-center text-sm text-zinc-500">
            Nao tem uma conta?{' '}
            <Link to="/pedidos" className="font-medium text-cyan-600">
              Crie uma conta
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}
