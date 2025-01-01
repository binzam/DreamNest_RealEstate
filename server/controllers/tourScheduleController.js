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

    const formattedTourDate = new Date(tourDateTime);
    const formattedTime = formattedTourDate.toLocaleTimeString();
    const formattedDate = formattedTourDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    const formatedAddress = property.address
      ? `${property.address.street || ''}, ${property.address.city || ''}, ${
          property.address.state || ''
        }`.trim()
      : 'Address not available';
    const newTourSchedule = new TourSchedule({
      propertyId,
      userId,
      tourDateTime,
    });
    await newTourSchedule.save();

    const ownerId = property.owner;

    const userNotification = new Notification({
      userId,
      initiatorId: userId,
      title: `Viewing Requested for ${property.title}`,
      message: `You have scheduled a viewing for property: ${formatedAddress} on ${formattedDate} at ${formattedTime}. Please wait for the owner's confirmation.`,
      type: 'tour',
      status: 'Pending',
      dateOfTour: formattedDate,
      timeOfTour: formattedTime,
      addressOfTour: formatedAddress,
      idOfProperty: propertyId,
    });
    await userNotification.save();

    const ownerNotification = new Notification({
      userId: ownerId,
      initiatorId: userId,
      title: `New Viewing Request for ${property.title}`,
      message: `A viewing request has been made for your property: ${formatedAddress} on ${formattedDate} at ${formattedTime}. Please confirm or cancel the request.`,
      type: 'tour',
      status: 'Pending',
      dateOfTour: formattedDate,
      timeOfTour: formattedTime,
      addressOfTour: formatedAddress,
      idOfProperty: propertyId,
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
      return res.status(200).json({ tours: [] });
    }

    const formattedTours = tours.map((tour) => ({
      tourId: tour._id,
      propertyTitle: tour.propertyId.title,
      propertyAddress: tour.propertyId.address,
      tourDateTime: tour.tourDateTime,
      status: tour.status,
    }));

    res.json({ tours: formattedTours.length > 0 ? formattedTours : [] });
  } catch (error) {
    console.error('Error fetching user tour schedules:', error);
    return res
      .status(500)
      .json({ message: 'Server error while fetching tour schedules' });
  }
};
const confirmTourSchedule = async (req, res) => {
  const { tourId } = req.params;
  const { status } = req.body;
  const userId = req.user._id;
  try {
    const tour = await TourSchedule.findById(tourId).populate('propertyId');

    if (!tour) {
      return res.status(404).json({ message: 'Viewing not found' });
    }

    if (tour.propertyId.owner.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: 'You are not authorized to confirm this viewing' });
    }

    tour.status = status;
    await tour.save();

    res.status(200).json({ message: 'Viewing status updated', viewing });
  } catch (error) {
    console.error('Error confirming viewing:', error);
    res
      .status(500)
      .json({ message: 'Server error while confirming the viewing' });
  }
};

export { schedulePropertyTour, getUserTourSchedules, confirmTourSchedule };
