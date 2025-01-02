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
}
export interface TourType {
  propertyId: string;
  tourId: string;
  propertyOwnerId: string;
  propertyTitle: string;
  dateOfTour: string;
  timeOfTour: string;
  addressOfTour: string;
  tourDateTime: Date;
  status: string;
}
