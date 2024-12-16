import { Property } from '../models/propertyModel.js';

const getProperties = async (req, res) => {
  try {
    const allProperties = await Property.find({});
    return res.status(200).json(allProperties);
  } catch (error) {
    console.log(error);
  }
};
export { getProperties };
