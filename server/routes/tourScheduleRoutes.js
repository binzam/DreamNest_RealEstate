import express from 'express';
import authenticateToken from '../middleware/authenticateToken.js';
import {
  schedulePropertyTour,
  getUserTourSchedules,
} from '../controllers/tourScheduleController.js';

const router = express.Router();
router.post('/schedule-tour', authenticateToken, schedulePropertyTour);
router.get('/schedules', authenticateToken, getUserTourSchedules);

export default router;
