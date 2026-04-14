import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import api from '../services/api';
import ProductCard from '../components/ProductCard';

export default function Productos() {
  const [products, setProducts] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');

  const cargarProductos = async () => {
    try {
      const endpoint = categoriaSeleccionada
        ? `/productos/categoria/${categoriaSeleccionada}`
        : '/productos';
      const { data } = await api.get(endpoint);
      setProducts(data);
    } catch {
      Swal.fire('Error', 'No se pudieron cargar los productos', 'error');
    }
  };

  const cargarCategorias = async () => {
    try {
      const { data } = await api.get('/categorias');
      setCategorias(data);
    } catch {
      Swal.fire('Error', 'No se pudieron cargar las categorías', 'error');
    }
  };

  const agregarAlCarrito = async (producto_id) => {
    try {
      await api.post('/carrito', { producto_id, cantidad: 1 });
      Swal.fire('Agregado', 'Producto agregado al carrito', 'success');
    } catch {
      Swal.fire('Error', 'No se pudo agregar al carrito', 'error');
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  useEffect(() => {
    cargarProductos();
  }, [categoriaSeleccionada]);

  return (
    <section>
      <div className="section-header">
        <h2>Catálogo Premium</h2>
        <select value={categoriaSeleccionada} onChange={(e) => setCategoriaSeleccionada(e.target.value)}>
          <option value="">Todas las categorías</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.nombre}</option>
          ))}
        </select>
      </div>
      <div className="grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={agregarAlCarrito} />
        ))}
      </div>
    </section>
  );
}
