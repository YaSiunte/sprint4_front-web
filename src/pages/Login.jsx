import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function Login() {
  const [name, setName] = useState('')
  const { login } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()
    login(name)
    navigate(location.state?.from || '/app')
  }

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 pb-12 pt-28">
      <section className="w-full max-w-md rounded-[20px] border-2 border-[#79667e] bg-[#79667e49] p-8 text-[#1c0c38] shadow-xl">
        <h1 className="mb-3 text-center text-3xl font-bold">
          Acesse a Jovi Smart Camera
        </h1>
        <p className="mb-6 text-center text-sm">
          Digite seu nome para continuar.
        </p>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <label htmlFor="name">Seu nome</label>
          <input
            id="name"
            className="rounded-md border border-[#79667e] bg-[#dcd7d5] px-3 py-3 outline-none focus:ring-2 focus:ring-[#79667e]"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Como podemos chamar você?"
            required
          />
          <button
            className="mt-2 rounded-lg border-2 border-[#dcd7d5] bg-[#79667e] py-3 font-semibold text-white transition hover:opacity-80"
            type="submit"
          >
            Continuar
          </button>
        </form>

        <Link className="mt-5 inline-block text-sm underline" to="/">
          Voltar ao site
        </Link>
      </section>
    </main>
  )
}

export default Login