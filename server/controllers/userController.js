import { User } from '../models/userModel.js';

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

export { removeFromWishlist, addToWishlist, userWishlist };
