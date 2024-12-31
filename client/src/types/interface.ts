export interface NotificationType {
  _id: string;
  message: string;
  status: string;
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