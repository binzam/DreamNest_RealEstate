import express from 'express';
import { createPaymentIntent } from '../controllers/paymentController.js';
import authenticateToken from '../middleware/authenticateToken.js';
const router = express.Router();

router.post('/create-payment-intent', authenticateToken, createPaymentIntent);

export default router;
