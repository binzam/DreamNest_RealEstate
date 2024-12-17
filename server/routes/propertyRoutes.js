import express from 'express';
import { getProperties, getPropertyById } from '../controllers/propertyController.js';

const router = express.Router();

router.get('/list', getProperties);
router.get('/list/:id', getPropertyById);

export default router;
