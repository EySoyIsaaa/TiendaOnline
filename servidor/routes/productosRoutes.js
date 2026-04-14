import { Router } from 'express';
import {
  createProducto,
  deleteProducto,
  getProductoById,
  getProductos,
  getProductosByCategoria,
  updateProducto
} from '../controllers/productosController.js';

const router = Router();

router.get('/', getProductos);
router.get('/categoria/:id', getProductosByCategoria);
router.get('/:id', getProductoById);
router.post('/', createProducto);
router.put('/:id', updateProducto);
router.delete('/:id', deleteProducto);

export default router;
