import express from 'express';
import { getAllTransactions, getAllUsers, getDashBoard } from '../controllers/adminController.js';
import authenticateToken from '../middleware/authenticateToken.js';
import { authorizeRole } from '../middleware/authorizeRole.js';

const router = express.Router();

router.get(
  '/dashboard',
  authenticateToken,
  authorizeRole('admin'),
  getDashBoard
);
router.get('/users', authenticateToken, authorizeRole('admin'), getAllUsers);
router.get('/transactions', authenticateToken, authorizeRole('admin'), getAllTransactions);

export default router;
