import { User } from '../models/userModel.js';
import path from 'path';

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const userProfile = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      dateJoined: user.createdAt,
      phoneNumber: user.phoneNumber,
      profilePicture: user.profilePicture,
    };
    return res.status(200).json(userProfile);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
const updateUserProfile = async (req, res) => {
  const { firstName, lastName, email, phoneNumber } = req.body;
  const userId = req.user._id;
  console.log('req.body////', req.body);

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.phoneNumber = phoneNumber || user.phoneNumber;

    await user.save();

    const userProfile = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      profilePicture: user.profilePicture,
    };

    res.status(200).json(userProfile);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
const uploadProfilePicture = async (req, res) => {
  const userId = req.user._id;
  console.log('req.file////', req.file);

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const filePath = path.join('uploads', req.file.filename);
    const profilePictureUrl = `${req.protocol}://${req.get(
      'host'
    )}/${filePath}`;
    user.profilePicture = profilePictureUrl;
    await user.save();

    res.status(200).json({ profilePicture: user.profilePicture });
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
const userWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('wishlist');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ wishlist: user.wishlist });
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
const addToWishlist = async (req, res) => {
  const { propertyId } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.wishlist.includes(propertyId)) {
      return res
        .status(400)
        .json({ message: 'Property is already in the wishlist' });
    }

    user.wishlist.push(propertyId);
    await user.save();
    const updatedUser = await User.findById(userId).populate('wishlist');
    return res.status(200).json({
      message: 'Property added to wishlist',
      wishlist: updatedUser.wishlist,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add property to wishlist' });
  }
};

const removeFromWishlist = async (req, res) => {
  const { propertyId } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (!user.wishlist.includes(propertyId)) {
      return res.status(400).json({ message: 'Property not in wishlist' });
    }
    user.wishlist = user.wishlist.filter((id) => id.toString() !== propertyId);
    await user.save();

    const updatedUser = await User.findById(userId).populate('wishlist');
    res.status(200).json({
      message: 'Property removed from wishlist',
      wishlist: updatedUser.wishlist,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to remove property from wishlist' });
  }
};

export {
  removeFromWishlist,
  addToWishlist,
  userWishlist,
  getUserProfile,
  updateUserProfile,
  uploadProfilePicture,
};
