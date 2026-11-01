import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="menu">
      <h6>NextWave</h6>

      <nav className="navegador">
        <Link to="/">
          Home<span />
        </Link>
        <a href="/#solucao">
          Solução<span />
        </a>
        <a href="/#publico">
          Público-alvo<span />
        </a>
        <Link to="/galeria">
          Galeria<span />
        </Link>
        <Link to="/equipe">
          Nossa equipe<span />
        </Link>
        <a href="#contato">
          Contato<span />
        </a>
        <Link
          className="rounded-md border border-[#dcd7d5] bg-[#79667e] px-3 py-2 transition hover:opacity-80"
          to="/app"
        >
          Jovi Camera<span />
        </Link>
      </nav>
    </header>
  )
}

export default Header