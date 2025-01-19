import express from 'express';
import { getDashBoard } from '../controllers/adminController.js';
import authenticateToken from '../middleware/authenticateToken.js';
import { authorizeRole } from '../middleware/authorizeRole.js';

const router = express.Router();

router.get(
  '/dashboard',
  authenticateToken,
  authorizeRole('admin'),
  getDashBoard
);
// router.post('/google', googleSignin);

export default router;
