import express from 'express';
import { login, registerUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', registerUser);
// router.get('/refresh');
// router.post('/logout');

export default router;
