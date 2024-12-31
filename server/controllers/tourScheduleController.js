import { Notification } from '../models/notificationModel.js';
import { Property } from '../models/propertyModel.js';
import { TourSchedule } from '../models/tourScheduleModel.js';

const schedulePropertyTour = async (req, res) => {
  const { propertyId, tourDateTime } = req.body;
  const userId = req.user._id;
  if (new Date(tourDateTime) < new Date()) {
    return res
      .status(400)
      .json({ message: 'Viewing date must be in the future' });
  }
  try {
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found.' });
    }
    const newTourSchedule = new TourSchedule({
      propertyId,
      userId,
      tourDateTime,
    });
    await newTourSchedule.save();

    const ownerId = property.owner;
    const formattedTime = new Date(tourDateTime).toLocaleTimeString();
    const formattedDate = new Date(tourDateTime).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    const userNotification = new Notification({
      userId,
      message: `You have scheduled a viewing for property: ${property.title} on ${formattedDate} at ${formattedTime}. Please wait for the owner's confirmation.`,
      type: 'tour',
      status: 'Pending',
    });
    await userNotification.save();

    const ownerNotification = new Notification({
      userId: ownerId,
      message: `A viewing request has been made for your property: ${property.title} on ${formattedDate} at ${formattedTime}. Please confirm or cancel the request.`,
      type: 'tour',
      status: 'Pending',
    });
    await ownerNotification.save();

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

const getUserTourSchedules = async (req, res) => {
  try {
    const userId = req.user._id;

    const tours = await TourSchedule.find({ userId }).populate(
      'propertyId',
      'title address'
    );

    if (tours.length === 0) {
      return res.status(404).json({ message: 'No tour schedules found.' });
    }

    const formattedTours = tours.map((tour) => ({
      tourId: tour._id,
      propertyTitle: tour.propertyId.title,
      propertyAddress: tour.propertyId.address,
      tourDateTime: tour.tourDateTime,
      status: tour.status,
    }));

    res.json({ tours: formattedTours });
  } catch (error) {
    console.error('Error fetching user tour schedules:', error);
    return res
      .status(500)
      .json({ message: 'Server error while fetching tour schedules' });
  }
};
export { schedulePropertyTour, getUserTourSchedules };
