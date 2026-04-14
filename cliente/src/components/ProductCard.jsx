import { Link } from 'react-router-dom';

export default function ProductCard({ product, onAdd }) {
  return (
    <article className="card">
      <img src={product.imagen} alt={product.nombre} className="card-img" />
      <div className="card-body">
        <span className="badge">{product.categoria}</span>
        <h3>{product.nombre}</h3>
        <p>{product.descripcion}</p>
        <p className="price">${Number(product.precio).toFixed(2)}</p>
        <p className="stock">Stock: {product.stock}</p>
        <div className="card-actions">
          <Link to={`/productos/${product.id}`} className="btn ghost">Detalle</Link>
          <button className="btn" onClick={() => onAdd(product.id)}>Agregar</button>
        </div>
      </div>
    </article>
  );
}
