export interface NotificationType {
  _id: string;
  userId: string;
  message: string;
  title: string;
  dateOfTour: string;
  timeOfTour: string;
  addressOfTour: string;
  idOfProperty: string;
  status: string;
  initiatorId: string;
  idOfTour: string;
  propertyOwnerId: string;
  createdAt: string;
  propertyImage: string;
  isRead: boolean;
}
export interface TourType {
  propertyId: string;
  propertyImage: string;
  tourId: string;
  propertyOwnerId: string;
  propertyTitle: string;
  dateOfTour: string;
  timeOfTour: string;
  addressOfTour: string;
  tourDateTime: Date;
  status: string;
  createdAt: string;
}
