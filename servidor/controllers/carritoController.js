import { pool } from '../config/db.js';

export async function getCarrito(_req, res) {
  try {
    const [rows] = await pool.query(
      `SELECT c.id, c.producto_id, c.cantidad, p.nombre, p.precio, p.imagen,
              (c.cantidad * p.precio) AS subtotal
       FROM carrito c
       JOIN productos p ON c.producto_id = p.id
       ORDER BY c.id DESC`
    );
    const total = rows.reduce((acc, item) => acc + Number(item.subtotal), 0);
    return res.json({ items: rows, total: Number(total.toFixed(2)) });
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener carrito', detalle: error.message });
  }
}

export async function addCarrito(req, res) {
  const { producto_id, cantidad } = req.body;

  if (!producto_id || Number(producto_id) <= 0 || !cantidad || Number(cantidad) <= 0) {
    return res.status(400).json({ mensaje: 'producto_id y cantidad deben ser válidos' });
  }

  try {
    const [existing] = await pool.query('SELECT id, cantidad FROM carrito WHERE producto_id = ?', [producto_id]);

    if (existing.length) {
      await pool.query('UPDATE carrito SET cantidad = cantidad + ? WHERE id = ?', [Number(cantidad), existing[0].id]);
      return res.status(200).json({ mensaje: 'Cantidad actualizada en carrito' });
    }

    await pool.query('INSERT INTO carrito (producto_id, cantidad) VALUES (?, ?)', [Number(producto_id), Number(cantidad)]);
    return res.status(201).json({ mensaje: 'Producto agregado al carrito' });
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al agregar al carrito', detalle: error.message });
  }
}

export async function updateCarrito(req, res) {
  const { cantidad } = req.body;
  if (!cantidad || Number(cantidad) <= 0) {
    return res.status(400).json({ mensaje: 'La cantidad debe ser mayor a 0' });
  }

  try {
    const [result] = await pool.query('UPDATE carrito SET cantidad = ? WHERE id = ?', [Number(cantidad), req.params.id]);
    if (!result.affectedRows) {
      return res.status(404).json({ mensaje: 'Ítem no encontrado en carrito' });
    }
    return res.json({ mensaje: 'Carrito actualizado' });
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al actualizar carrito', detalle: error.message });
  }
}

export async function deleteCarritoItem(req, res) {
  try {
    const [result] = await pool.query('DELETE FROM carrito WHERE id = ?', [req.params.id]);
    if (!result.affectedRows) {
      return res.status(404).json({ mensaje: 'Ítem no encontrado en carrito' });
    }
    return res.json({ mensaje: 'Ítem eliminado del carrito' });
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al eliminar ítem', detalle: error.message });
  }
}

export async function clearCarrito(_req, res) {
  try {
    await pool.query('DELETE FROM carrito');
    return res.json({ mensaje: 'Carrito vaciado' });
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al vaciar carrito', detalle: error.message });
  }
}
