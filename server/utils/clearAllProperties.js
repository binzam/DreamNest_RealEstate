import { Property } from '../models/propertyModel.js';

export const clearAllProperties = async () => {
  try {
    const result = await Property.deleteMany({});
    console.log(`Deleted ${result.deletedCount} Properties.`);
  } catch (error) {
    console.error('Error deleting Auctions:', error);
  }
};
