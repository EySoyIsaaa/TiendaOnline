import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import api from '../services/api';

const estadoInicial = {
  nombre: '', descripcion: '', precio: '', imagen: '', stock: '', categoria_id: ''
};

export default function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState(estadoInicial);
  const [editId, setEditId] = useState(null);

  const cargar = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([api.get('/productos'), api.get('/categorias')]);
      setProductos(prodRes.data);
      setCategorias(catRes.data);
    } catch {
      Swal.fire('Error', 'No se pudo cargar panel admin', 'error');
    }
  };

  useEffect(() => { cargar(); }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/productos/${editId}`, form);
        Swal.fire('Actualizado', 'Producto actualizado correctamente', 'success');
      } else {
        await api.post('/productos', form);
        Swal.fire('Creado', 'Producto creado correctamente', 'success');
      }
      setForm(estadoInicial);
      setEditId(null);
      cargar();
    } catch (error) {
      Swal.fire('Error', error?.response?.data?.mensaje || 'No se pudo guardar el producto', 'error');
    }
  };

  const editar = (p) => {
    setEditId(p.id);
    setForm({
      nombre: p.nombre,
      descripcion: p.descripcion,
      precio: p.precio,
      imagen: p.imagen,
      stock: p.stock,
      categoria_id: p.categoria_id
    });
  };

  const eliminar = async (id) => {
    const result = await Swal.fire({ title: '¿Eliminar producto?', icon: 'warning', showCancelButton: true });
    if (!result.isConfirmed) return;
    try {
      await api.delete(`/productos/${id}`);
      Swal.fire('Eliminado', 'Producto eliminado', 'success');
      cargar();
    } catch {
      Swal.fire('Error', 'No se pudo eliminar el producto', 'error');
    }
  };

  return (
    <section>
      <h2>Admin · CRUD de Productos</h2>
      <form className="panel form-grid" onSubmit={onSubmit}>
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={onChange} required />
        <input name="precio" type="number" step="0.01" placeholder="Precio" value={form.precio} onChange={onChange} required />
        <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={onChange} required />
        <input name="imagen" placeholder="URL imagen" value={form.imagen} onChange={onChange} required />
        <select name="categoria_id" value={form.categoria_id} onChange={onChange} required>
          <option value="">Selecciona categoría</option>
          {categorias.map((cat) => <option key={cat.id} value={cat.id}>{cat.nombre}</option>)}
        </select>
        <textarea name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={onChange} required />
        <button className="btn" type="submit">{editId ? 'Actualizar' : 'Crear'} producto</button>
      </form>

      <div className="panel">
        {productos.map((p) => (
          <div key={p.id} className="admin-row">
            <strong>{p.nombre}</strong>
            <span>${Number(p.precio).toFixed(2)}</span>
            <span>Stock: {p.stock}</span>
            <span>{p.categoria}</span>
            <button className="btn ghost" onClick={() => editar(p)}>Editar</button>
            <button className="btn danger" onClick={() => eliminar(p.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </section>
  );
}
