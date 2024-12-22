import express from 'express';
import {
  addProperty,
  getProperties,
  getPropertiesByCategory,
  getPropertyById,
  schedulePropertyTour,
} from '../controllers/propertyController.js';
import authenticateToken from '../middleware/authenticateToken.js';

const router = express.Router();

router.get('/list', getProperties);
router.get('/list/categorized', getPropertiesByCategory); // should be defined frst or itll cause objid error
router.get('/list/:id', getPropertyById);
router.post('/schedule-tour', schedulePropertyTour);
router.post('/add-property', authenticateToken, addProperty);
export default router;
