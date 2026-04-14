import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import api from '../services/api';

export default function Carrito() {
  const [carrito, setCarrito] = useState({ items: [], total: 0 });

  const cargar = async () => {
    try {
      const { data } = await api.get('/carrito');
      setCarrito(data);
    } catch {
      Swal.fire('Error', 'No se pudo cargar el carrito', 'error');
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const actualizarCantidad = async (id, cantidad) => {
    if (cantidad <= 0) return;
    try {
      await api.put(`/carrito/${id}`, { cantidad });
      cargar();
    } catch {
      Swal.fire('Error', 'No se pudo actualizar cantidad', 'error');
    }
  };

  const eliminar = async (id) => {
    const result = await Swal.fire({
      title: '¿Eliminar producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar'
    });
    if (!result.isConfirmed) return;

    try {
      await api.delete(`/carrito/${id}`);
      Swal.fire('Eliminado', 'Ítem eliminado del carrito', 'success');
      cargar();
    } catch {
      Swal.fire('Error', 'No se pudo eliminar', 'error');
    }
  };

  const vaciar = async () => {
    const result = await Swal.fire({
      title: '¿Vaciar carrito completo?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Vaciar'
    });
    if (!result.isConfirmed) return;

    try {
      await api.delete('/carrito');
      Swal.fire('Listo', 'Carrito vaciado', 'success');
      cargar();
    } catch {
      Swal.fire('Error', 'No se pudo vaciar carrito', 'error');
    }
  };

  return (
    <section>
      <div className="section-header">
        <h2>Carrito</h2>
        <button className="btn ghost" onClick={vaciar}>Vaciar carrito</button>
      </div>
      <div className="panel">
        {carrito.items.length === 0 ? <p>Tu carrito está vacío.</p> : carrito.items.map((item) => (
          <div key={item.id} className="cart-row">
            <img src={item.imagen} alt={item.nombre} />
            <div>
              <h4>{item.nombre}</h4>
              <p>${Number(item.precio).toFixed(2)} c/u</p>
            </div>
            <div className="qty-controls">
              <button onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}>-</button>
              <span>{item.cantidad}</span>
              <button onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}>+</button>
            </div>
            <p>${Number(item.subtotal).toFixed(2)}</p>
            <button className="btn danger" onClick={() => eliminar(item.id)}>Eliminar</button>
          </div>
        ))}
      </div>
      <h3 className="total">Total: ${Number(carrito.total).toFixed(2)}</h3>
    </section>
  );
}
