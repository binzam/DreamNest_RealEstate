import express from 'express';
import { getProperties } from '../controllers/propertyController.js';

const router = express.Router();

router.get('/list', getProperties);

export default router;
