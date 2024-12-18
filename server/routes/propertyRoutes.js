import express from 'express';
import {
  getProperties,
  getPropertiesByCategory,
  getPropertyById,
} from '../controllers/propertyController.js';

const router = express.Router();

router.get('/list', getProperties);
router.get('/list/categorized', getPropertiesByCategory);// should be defined frst or itll cause objid error
router.get('/list/:id', getPropertyById);
export default router;
