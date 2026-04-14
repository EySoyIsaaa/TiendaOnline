import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="logo">Elite Car Audio</Link>
      <nav>
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/productos">Catálogo</NavLink>
        <NavLink to="/categorias">Categorías</NavLink>
        <NavLink to="/carrito">Carrito</NavLink>
        <NavLink to="/nosotros">Nosotros</NavLink>
        <NavLink to="/contacto">Contacto</NavLink>
        <NavLink to="/admin">Admin</NavLink>
      </nav>
    </header>
  );
}
