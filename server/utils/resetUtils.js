import { Notification } from '../models/notificationModel.js';
import { Property } from '../models/propertyModel.js';
import { TourSchedule } from '../models/tourScheduleModel.js';
import { Transaction } from '../models/transactionModel.js';
import { User } from '../models/userModel.js';

const clearAllUsers = async () => {
  try {
    const result = await User.deleteMany({});
    console.log(`Deleted ${result.deletedCount} Users.`);
  } catch (error) {
    console.error('Error deleting Users:', error);
  }
};

const clearAllProperties = async () => {
  try {
    const result = await Property.deleteMany({});
    console.log(`Deleted ${result.deletedCount} Properties.`);
  } catch (error) {
    console.error('Error deleting Auctions:', error);
  }
};

const clearAllNotifications = async () => {
  try {
    const result = await Notification.deleteMany({});
    console.log(`Deleted ${result.deletedCount} Notifications.`);
  } catch (error) {
    console.error('Error deleting Notifications:', error);
  }
};
const clearAllTransactions = async () => {
  try {
    const result = await Transaction.deleteMany({});
    console.log(`Deleted ${result.deletedCount} Transactions.`);
  } catch (error) {
    console.error('Error deleting Transactions:', error);
  }
};

const clearAllTourSchedules = async () => {
  try {
    const result = await TourSchedule.deleteMany({});
    console.log(`Deleted ${result.deletedCount} Tour schedules.`);
  } catch (error) {
    console.error('Error deleting Tour schedules:', error);
  }
};

const fixBug = async () => {
  try {
    await User.updateMany(
      { phoneNumber: { $exists: false } }, // Find documents with missing phoneNumber
      { $set: { phoneNumber: null } } // Set phoneNumber to null for these documents
    );
    
  } catch (error) {
    console.error('Error in fix:', error);
  }
};

export {
  clearAllUsers,
  clearAllProperties,
  clearAllNotifications,
  clearAllTourSchedules,
  fixBug,
  clearAllTransactions,
};
