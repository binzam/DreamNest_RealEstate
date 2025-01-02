import { Notification } from '../models/notificationModel.js';
import { Property } from '../models/propertyModel.js';
import { TourSchedule } from '../models/tourScheduleModel.js';

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

const clearAllTourSchedules = async () => {
  try {
    const result = await TourSchedule.deleteMany({});
    console.log(`Deleted ${result.deletedCount} Tour schedules.`);
  } catch (error) {
    console.error('Error deleting Tour schedules:', error);
  }
};

export { clearAllProperties, clearAllNotifications, clearAllTourSchedules };
