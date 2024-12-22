import { Property } from '../models/propertyModel.js';
import { TourSchedule } from '../models/TourScheduleModel.js';
import { sendEmail } from '../utils/notificationsUtil.js';
import { categorizeProperties } from '../utils/propertyUtils.js';

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
    const {
      name,
      street,
      city,
      state,
      country,
      price,
      bed,
      bath,
      sqft,
      image,
      photos,
      detail,
      category,
      propertyFor,
      propertyType,
      latitude,
      longitude,
    } = req.body;

    // Validate that the required fields are provided
    if (
      !name ||
      !street ||
      !city ||
      !state ||
      !country ||
      !price ||
      !bed ||
      !bath ||
      !sqft ||
      !image ||
      !latitude ||
      !longitude ||
      !category ||
      !propertyFor ||
      !propertyType ||
      !detail
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Assuming the user is authenticated and the user's ID is in req.user._id
    const owner = req.user._id; // This is how you access the authenticated user's ID

    const newProperty = new Property({
      name,
      street,
      city,
      state,
      country,
      price,
      bed,
      bath,
      sqft,
      image,
      photos,
      detail,
      category,
      propertyFor,
      propertyType,
      owner,
      latitude,
      longitude,
    });

    const savedProperty = await newProperty.save();

    res.status(201).json({
      message: 'Property added successfully',
      property: savedProperty,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export {
  getProperties,
  getPropertyById,
  getPropertiesByCategory,
  schedulePropertyTour,
  addProperty,
};
