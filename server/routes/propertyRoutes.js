import express from 'express';
import {
  addProperty,
  getProperties,
  getPropertiesByCategory,
  getPropertyById,
  schedulePropertyTour,
} from '../controllers/propertyController.js';
import authenticateToken from '../middleware/authenticateToken.js';
import multer from 'multer';
import fs from 'fs';
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
// const fileFilter = (req, file, cb) => {
//   const allowedFileTypes = ['image/jpeg', 'image/png'];
//   if (!allowedFileTypes.includes(file.mimetype)) {
//     return cb(
//       new Error('Invalid file type. Only JPEG and PNG files are allowed.'),
//       false
//     );
//   }
//   cb(null, true);
// };
// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 8000000 },
// });
const upload = multer({
  storage,
});
router.get('/list', getProperties);
router.get('/list/categorized', getPropertiesByCategory); // should be defined frst or itll cause objid error
router.get('/list/:id', getPropertyById);
router.post('/schedule-tour', schedulePropertyTour);
router.post(
  '/add-property',
  authenticateToken,
  upload.array('photos'),
  addProperty
);
export default router;
