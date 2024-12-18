import express from 'express';
import {
  addToWishlist,
  removeFromWishlist,
  userWishlist,
} from '../controllers/userController.js';
import authenticateToken from '../middleware/authenticateToken.js';

const router = express.Router();

router.get('/wishlist', authenticateToken, userWishlist);

router.post('/add-to-wishlist', authenticateToken, addToWishlist);

router.post('/remove-from-wishlist', authenticateToken, removeFromWishlist);

export default router;
