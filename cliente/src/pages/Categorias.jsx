import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import api from '../services/api';

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const cargar = async () => {
      try {
        const { data } = await api.get('/categorias');
        setCategorias(data);
      } catch {
        Swal.fire('Error', 'No se pudieron cargar las categorías', 'error');
      }
    };
    cargar();
  }, []);

  return (
    <section>
      <h2>Categorías Disponibles</h2>
      <div className="grid small">
        {categorias.map((cat) => (
          <article key={cat.id} className="panel">
            <h3>{cat.nombre}</h3>
            <p>{cat.descripcion}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
