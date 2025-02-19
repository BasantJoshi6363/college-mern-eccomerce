import express from 'express';
import { addToCart } from '../controllers/cart.controller.js';
import { protect } from '../middleware/auth.middleware.js';
const cart_router = express.Router();

// Route to add item to cart
cart_router.post('/add', protect, addToCart);

export default cart_router;
