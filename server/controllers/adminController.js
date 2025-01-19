import { Property } from "../models/propertyModel.js";
import { User } from "../models/userModel.js";

const getDashBoard = async (req, res) => {
  try {
    const totalProperties = await Property.countDocuments();

    const totalUsers = await User.countDocuments();

    return res.status(200).json({
      data: {
        totalProperties,
        totalUsers
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Server error, unable to fetch dashboard data.',
    });
  }
};

export { getDashBoard };
