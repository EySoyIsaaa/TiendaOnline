import { pool } from '../config/db.js';

function validarProducto(body) {
  const { nombre, descripcion, precio, imagen, stock, categoria_id } = body;
  if (!nombre || !descripcion || precio == null || !imagen || stock == null || !categoria_id) {
    return 'Todos los campos son obligatorios';
  }
  if (Number(precio) < 0 || Number(stock) < 0 || Number(categoria_id) <= 0) {
    return 'Precio, stock y categoría deben ser válidos';
  }
  return null;
}

export async function getProductos(_req, res) {
  try {
    const [rows] = await pool.query(
      `SELECT p.id, p.nombre, p.descripcion, p.precio, p.imagen, p.stock, p.categoria_id, c.nombre AS categoria
       FROM productos p
       JOIN categorias c ON p.categoria_id = c.id
       ORDER BY p.id DESC`
    );
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener productos', detalle: error.message });
  }
}

export async function getProductoById(req, res) {
  try {
    const [rows] = await pool.query(
      `SELECT p.id, p.nombre, p.descripcion, p.precio, p.imagen, p.stock, p.categoria_id, c.nombre AS categoria
       FROM productos p
       JOIN categorias c ON p.categoria_id = c.id
       WHERE p.id = ?`,
      [req.params.id]
    );

    if (!rows.length) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    return res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener producto', detalle: error.message });
  }
}

export async function getProductosByCategoria(req, res) {
  try {
    const [rows] = await pool.query(
      `SELECT p.id, p.nombre, p.descripcion, p.precio, p.imagen, p.stock, p.categoria_id, c.nombre AS categoria
       FROM productos p
       JOIN categorias c ON p.categoria_id = c.id
       WHERE p.categoria_id = ?
       ORDER BY p.id DESC`,
      [req.params.id]
    );
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al filtrar productos', detalle: error.message });
  }
}

export async function createProducto(req, res) {
  const errorValidacion = validarProducto(req.body);
  if (errorValidacion) {
    return res.status(400).json({ mensaje: errorValidacion });
  }

  try {
    const { nombre, descripcion, precio, imagen, stock, categoria_id } = req.body;
    const [result] = await pool.query(
      'INSERT INTO productos (nombre, descripcion, precio, imagen, stock, categoria_id) VALUES (?, ?, ?, ?, ?, ?)',
      [nombre, descripcion, Number(precio), imagen, Number(stock), Number(categoria_id)]
    );
    return res.status(201).json({ mensaje: 'Producto creado', id: result.insertId });
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al crear producto', detalle: error.message });
  }
}

export async function updateProducto(req, res) {
  const errorValidacion = validarProducto(req.body);
  if (errorValidacion) {
    return res.status(400).json({ mensaje: errorValidacion });
  }

  try {
    const { nombre, descripcion, precio, imagen, stock, categoria_id } = req.body;
    const [result] = await pool.query(
      `UPDATE productos
       SET nombre = ?, descripcion = ?, precio = ?, imagen = ?, stock = ?, categoria_id = ?
       WHERE id = ?`,
      [nombre, descripcion, Number(precio), imagen, Number(stock), Number(categoria_id), req.params.id]
    );

    if (!result.affectedRows) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    return res.json({ mensaje: 'Producto actualizado' });
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al actualizar producto', detalle: error.message });
  }
}

export async function deleteProducto(req, res) {
  try {
    const [result] = await pool.query('DELETE FROM productos WHERE id = ?', [req.params.id]);
    if (!result.affectedRows) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    return res.json({ mensaje: 'Producto eliminado' });
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al eliminar producto', detalle: error.message });
  }
}
