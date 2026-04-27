import { useState, type FormEvent } from 'react'
import { Eye, EyeOff, WandSparkles } from 'lucide-react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import LoginPhoto from '../assets/login.png'
import { useAccessUsers } from '../hooks/use-access-users'

export function LoginPage() {
  const navigate = useNavigate()
  const { currentUser, login } = useAccessUsers()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  if (currentUser) {
    return <Navigate to="/pedidos" replace />
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    const loggedIn = login(email, password)
    if (!loggedIn) {
      setError('Email ou senha invalidos.')
      return
    }

    navigate('/pedidos', { replace: true })
  }

  return (
    <div className="grid min-h-screen grid-cols-1 bg-zinc-100 lg:grid-cols-2">
      <section className="relative hidden lg:block">
        <img src={LoginPhoto} alt="Imagem de fundo" className="h-full w-full object-cover" />
      </section>

      <section className="flex items-center justify-center p-6 lg:p-10">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
          <div className="mb-8 flex items-center gap-3">
            <WandSparkles className="text-indigo-500" size={20} />
            <p className="text-sm font-semibold text-zinc-700">Login de acesso</p>
          </div>

          <h1 className="text-3xl font-semibold text-zinc-900">Gestão de tatuagem</h1>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-2 block text-sm text-zinc-600">E-mail</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Digite seu e-mail"
                required
                className="h-11 w-full rounded-md border border-zinc-200 bg-zinc-50 px-3 text-zinc-800 outline-none transition focus:border-indigo-400"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-zinc-600">Senha</span>
              <div className="flex h-11 items-center rounded-md border border-zinc-200 bg-zinc-50 px-3">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Digite a senha"
                  required
                  className="w-full bg-transparent text-zinc-800 outline-none"
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  onClick={() => setShowPassword((visible) => !visible)}
                  className="text-zinc-500 hover:text-zinc-700"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </label>

            {error ? (
              <p className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-600">
                {error}
              </p>
            ) : null}

            <Button className="w-full" variant="danger" type="submit">
              Ingressar a conta
            </Button>

            <Button className="w-full gap-2" variant="secondary" type="button">
              <span className="text-base">G</span>
              Conectar com o Google
            </Button>
          </form>
        </div>
      </section>
    </div>
  )
}
