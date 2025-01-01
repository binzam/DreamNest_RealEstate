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
}
export interface TourType {
  tourId: string;
  propertyTitle: string;
  propertyAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  tourDateTime: string;
  status: string;
}
