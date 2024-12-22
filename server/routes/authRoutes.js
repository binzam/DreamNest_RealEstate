import express from 'express';
import { login, logout, refresh, registerUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', registerUser);
router.get('/refresh-token',  refresh);
router.post('/logout', logout);

export default router;
