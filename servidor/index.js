import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import categoriasRoutes from './routes/categoriasRoutes.js';
import productosRoutes from './routes/productosRoutes.js';
import carritoRoutes from './routes/carritoRoutes.js';
import { pool } from './config/db.js';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 4000);

app.use(cors());
app.use(express.json({ limit: '2mb' }));

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    return res.json({ estado: 'ok', db: 'conectada' });
  } catch {
    return res.status(500).json({ estado: 'error', db: 'sin conexión' });
  }
});

app.use('/api/categorias', categoriasRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/carrito', carritoRoutes);

app.use((_req, res) => res.status(404).json({ mensaje: 'Ruta no encontrada' }));

app.listen(PORT, () => {
  console.log(`Servidor API activo en http://localhost:${PORT}`);
});
