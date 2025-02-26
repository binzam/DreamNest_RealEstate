import express from 'express';
import {
  addProperty,
  getProperties,
  getPropertiesByCategory,
  getPropertiesOwnedByUser,
  getPropertyById,
  updateProperty,
  deleteProperty,
  validateProperty,
  getTopPropertyLocations,
  getFeaturedProperties,
  uploadPropertyImages,
} from '../controllers/propertyController.js';
import authenticateToken from '../middleware/authenticateToken.js';
import multer from 'multer';
import fs from 'fs';
import authenticateOptional from '../middleware/authenticateOptional.js';
const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/properties';
    try {
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    } catch (err) {
      cb(err, null);
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({
  storage,
});

router.get('/list', authenticateOptional, getProperties);

router.get('/featured', getFeaturedProperties);
router.get('/top-locations', getTopPropertyLocations);
router.get('/list/categorized', authenticateOptional, getPropertiesByCategory); // should be defined frst or itll cause objid error
router.get('/list/:id', authenticateOptional, getPropertyById);
router.get('/my-properties', authenticateToken, getPropertiesOwnedByUser);
router.put('/list/:id/update', authenticateToken, updateProperty);
router.post(
  '/list/:id/upload-images',
  authenticateToken,
  upload.array('photos'),
  uploadPropertyImages
);
router.post(
  '/validate',
  authenticateToken,
  upload.array('photos'),
  validateProperty
);
router.delete('/list/:id/delete', authenticateToken, deleteProperty);
router.post(
  '/add-property',
  authenticateToken,
  upload.array('photos'),
  addProperty
);
export default router;
