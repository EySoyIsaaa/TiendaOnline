import { pool } from '../config/db.js';

export async function getCategorias(_req, res) {
  try {
    const [rows] = await pool.query('SELECT id, nombre, descripcion FROM categorias ORDER BY nombre');
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener categorías', detalle: error.message });
  }
}
