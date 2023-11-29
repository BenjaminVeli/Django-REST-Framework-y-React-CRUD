import { Link } from "react-router-dom"

export function Navbar() {
  return (
    <>
      <nav className="navbar  navbar-expand-lg bg-success">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link text-light" to="/productos">Productos</Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link text-light" to="/categorias">Categorias</Link>
              </li>
            </ul>
      </nav>
    </>
  )
}