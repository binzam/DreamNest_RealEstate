import express from 'express';
import { login, refresh, registerUser } from '../controllers/authController.js';
// import authenticateToken from '../middleware/authenticateToken.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', registerUser);
router.get('/refresh-token',  refresh);
// router.post('/logout');

export default router;
