import express from 'express';
import {
  addToWishlist,
  removeFromWishlist,
  userWishlist,
  getUserProfile,
  updateUserProfile,
  uploadProfilePicture,
  getUserNotifications,
} from '../controllers/userController.js';
import authenticateToken from '../middleware/authenticateToken.js';
import multer from 'multer';
import fs from 'fs';
import multerErrorHandler from '../middleware/multerErrorHandler.js';
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
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/png'];
  if (!allowedFileTypes.includes(file.mimetype)) {
    return cb(
      new Error('Invalid file type. Only JPEG and PNG files are allowed.'),
      false
    );
  }
  cb(null, true);
};
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 80000 },
});

router.get('/wishlist', authenticateToken, userWishlist);
router.get('/notifications', authenticateToken, getUserNotifications);

router.post('/add-to-wishlist', authenticateToken, addToWishlist);

router.post('/remove-from-wishlist', authenticateToken, removeFromWishlist);
router.get('/profile', authenticateToken, getUserProfile);
router.post(
  '/profile/upload-picture',
  authenticateToken,
  upload.single('profilePicture'),
  multerErrorHandler,
  uploadProfilePicture
);
router.put('/profile', authenticateToken, updateUserProfile);

export default router;
