import { Property } from '../models/propertyModel.js';
import { TourSchedule } from '../models/TourScheduleModel.js';
import { sendEmail } from '../utils/notificationsUtil.js';
import { categorizeProperties } from '../utils/propertyUtils.js';
import path from 'path';
import { validatePropertyData } from '../utils/propertyValidation.js';
import { log } from 'console';

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

const schedulePropertyTour = async (req, res) => {
  const { propertyId, viewingDate } = req.body;
  const userId = req.user._id;
  if (new Date(viewingDate) < new Date()) {
    return res
      .status(400)
      .json({ message: 'Viewing date must be in the future' });
  }
  try {
    const newTourSchedule = new TourSchedule({
      propertyId,
      userId,
      viewingDate,
    });
    await newTourSchedule.save();

    // Get the property owner from the Property model (assuming `Property` model exists)
    const property = await Property.findById(propertyId);
    const ownerId = property.owner; // Assuming `ownerId` is the owner's user ID

    // Send notification to the user
    const userNotification = new Notification({
      userId,
      message: `You have scheduled a viewing for property: ${property.name} on ${viewingDate}. Please wait for the owner's confirmation.`,
      type: 'tour',
      status: 'Pending', // You can adjust the status as needed
    });
    await userNotification.save();

    // Send notification to the property owner
    const ownerNotification = new Notification({
      userId: ownerId,
      message: `A viewing request has been made for your property: ${property.name} on ${viewingDate}. Please confirm or cancel the request.`,
      type: 'tour',
      status: 'Pending', // Owner has to take action
    });
    await ownerNotification.save();

    // Send email to the user
    await sendEmail({
      to: req.user.email,
      subject: 'Property Viewing Scheduled',
      text: `You have scheduled a viewing for property: ${property.name} on ${viewingDate}. Please wait for the owner's confirmation.`,
    });

    // Send email to the owner
    const ownerEmail = property.ownerEmail;
    await sendEmail({
      to: ownerEmail,
      subject: 'Property Viewing Request',
      text: `A viewing request has been made for your property: ${property.name} on ${viewingDate}. Please confirm or cancel the request.`,
    });

    // Return response
    res.status(201).json({
      message: 'Viewing scheduled successfully',
      tourSchedule: newTourSchedule,
    });
  } catch (error) {
    console.error('Error scheduling tour:', error);
    return res
      .status(500)
      .json({ message: 'Server error while scheduling tour' });
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
      return res
        .status(404)
        .json({ message: 'No properties found for this user.' });
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
  schedulePropertyTour,
  addProperty,
  getPropertiesOwnedByUser,
  updateProperty,
  deleteProperty,
};
