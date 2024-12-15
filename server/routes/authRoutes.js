import express from 'express';

const router = express.Router();

router.post('/login');
router.post('/register');
router.get('/refresh');
router.post('/logout');

export default router;
