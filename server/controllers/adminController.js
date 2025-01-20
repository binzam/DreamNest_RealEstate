import { Property } from '../models/propertyModel.js';
import { User } from '../models/userModel.js';

const getDashBoard = async (req, res) => {
  try {
    const totalProperties = await Property.countDocuments();

    const totalUsers = await User.countDocuments();
    const latestProperties = await Property.find()
      .sort({ createdAt: -1 })
      .limit(2)
      .populate('owner', 'firstName lastName email profilePicture createdAt');
    const latestUsers = await User.find().sort({ createdAt: -1 }).limit(5);

    return res.status(200).json({
      data: {
        totalProperties,
        totalUsers,
        latestProperties,
        latestUsers,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Server error, unable to fetch dashboard data.',
    });
  }
};
const getLatestProperties = async (req, res) => {
  try {
    const latestProperties = await Property.find()
      .sort({ createdAt: -1 })
      .limit(5);

    return res.status(200).json({
      data: latestProperties,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Server error, unable to fetch latest properties.',
    });
  }
};

export { getDashBoard, getLatestProperties };
