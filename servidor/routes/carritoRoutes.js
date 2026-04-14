import { Router } from 'express';
import {
  addCarrito,
  clearCarrito,
  deleteCarritoItem,
  getCarrito,
  updateCarrito
} from '../controllers/carritoController.js';

const router = Router();

router.get('/', getCarrito);
router.post('/', addCarrito);
router.put('/:id', updateCarrito);
router.delete('/:id', deleteCarritoItem);
router.delete('/', clearCarrito);

export default router;
