import { Property } from '../models/propertyModel.js';
// import { TourSchedule } from '../models/tourScheduleModel.js';
// import { sendEmail } from '../utils/notificationsUtil.js';
import { categorizeProperties } from '../utils/propertyUtils.js';
import path from 'path';
import { validatePropertyData } from '../utils/propertyValidation.js';
import { Transaction } from '../models/transactionModel.js';

const getProperties = async (req, res) => {
  try {
    const allProperties = await Property.find({});
    return res.status(200).json(allProperties);
  } catch (error) {
    console.log(error);
  }
};
const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findById(id);
    if (!property) {
      return res.status(400).json({
        message: 'property not found',
      });
    }
    return res.status(200).json(property);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getPropertiesByCategory = async (req, res) => {
  try {
    const allProperties = await Property.find({});
    const categorizedProperties = categorizeProperties(allProperties);
    // console.log("categorized properties",categorizedProperties);

    return res.status(200).json(categorizedProperties);
  } catch (error) {
    console.error('Error fetching categorized properties:', error);
    return res
      .status(500)
      .json({ message: 'Server error while fetching properties' });
  }
};

const addProperty = async (req, res) => {
  try {
    const { isValid, errors, value } = validatePropertyData(
      req.body,
      req.files
    );

    if (!isValid) {
      return res.status(400).json({
        message: 'Validation Error',
        errors,
      });
    }

    // Convert file paths into URLs
    const photos = value.photos.map((photo, index) => {
      const filePath = path.join('uploads', req.files[index].filename);
      const imageUrl = `${req.protocol}://${req.get('host')}/${filePath}`;
      return { ...photo, image: imageUrl };
    });

    // Create new property
    const ownerId = req.user._id;
    const newProperty = new Property({
      ...value,
      photos,
      owner: ownerId,
    });

    await newProperty.save();

    // Update the transaction with the propertyId
    if (value.tempPropertyId) {
      await Transaction.findOneAndUpdate(
        { tempPropertyId: value.tempPropertyId },
        { propertyId: newProperty._id },
        { new: true }
      );
    }
    return res.status(201).json({
      message: 'Property added successfully',
      property: newProperty,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add property', error });
  }
};
const getPropertiesOwnedByUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const properties = await Property.find({ owner: userId });

    if (!properties || properties.length === 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(properties);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};
const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    if (property.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: 'Unauthorized to update this property' });
    }

    const updatedProperty = await Property.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(updatedProperty);
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(500).json({ message: 'Failed to update property' });
  }
};
const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params; // Get property ID from request params

    // Find the property by its ID
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    if (property.owner.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: 'Unauthorized to delete this property' });
    }

    await Property.findByIdAndDelete(id);

    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).json({ message: 'Failed to delete property' }); // Handle errors
  }
};
export {
  getProperties,
  getPropertyById,
  getPropertiesByCategory,
  addProperty,
  getPropertiesOwnedByUser,
  updateProperty,
  deleteProperty,
};
