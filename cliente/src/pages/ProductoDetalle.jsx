import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../services/api';

export default function ProductoDetalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        const { data } = await api.get(`/productos/${id}`);
        setProducto(data);
      } catch {
        Swal.fire('Error', 'No se encontró el producto', 'error');
      }
    };
    cargar();
  }, [id]);

  const agregar = async () => {
    try {
      await api.post('/carrito', { producto_id: producto.id, cantidad: 1 });
      Swal.fire('Listo', 'Producto agregado al carrito', 'success');
    } catch {
      Swal.fire('Error', 'No se pudo agregar al carrito', 'error');
    }
  };

  if (!producto) return <p>Cargando...</p>;

  return (
    <section className="detalle">
      <img src={producto.imagen} alt={producto.nombre} />
      <div>
        <span className="badge">{producto.categoria}</span>
        <h2>{producto.nombre}</h2>
        <p>{producto.descripcion}</p>
        <p className="price">${Number(producto.precio).toFixed(2)}</p>
        <p>Stock disponible: {producto.stock}</p>
        <button className="btn" onClick={agregar}>Agregar al carrito</button>
      </div>
    </section>
  );
}
