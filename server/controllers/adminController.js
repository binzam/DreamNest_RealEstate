import { Property } from '../models/propertyModel.js';
import { Transaction } from '../models/transactionModel.js';
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
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 }); // Sort by latest first
    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};
const getAllUsers = async (req, res) => {
  const { search, role, sort, hasListedProperty } = req.query;

  const query = {};
  if (search) {
    query.$or = [
      { firstName: { $regex: search, $options: 'i' } },
      { lastName: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }
  if (role && role !== 'all') {
    query.role = role;
  }

  const sortOrder = sort === 'oldest' ? 1 : -1;

  try {
    let users = await User.find(query)
      .select('firstName lastName email profilePicture createdAt _id role')
      .sort({ createdAt: sortOrder });

    const usersData = await Promise.all(
      users.map(async (user) => {
        const propertiesListed = await Property.countDocuments({
          owner: user._id,
        });

        return {
          ...user.toObject(),
          propertiesListed,
        };
      })
    );
    if (hasListedProperty === 'true') {
      const usersWithPropeties = usersData.filter(
        (user) => user.propertiesListed > 0
      );
      return res.status(200).json(usersWithPropeties);
    }
    return res.status(200).json(usersData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Server error, unable to fetch users.',
    });
  }
};
export { getDashBoard, getLatestProperties, getAllUsers, getAllTransactions };
