import { PhotoType, PropertyDataType } from './propertyTypes';
import { UserData } from './userTypes';

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
  schedulerEmail?: string;
  schedulerId?: string;
}
export interface TransactionType {
  _id: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
  customerName: string;
  customerEmail: string;
  customerId: string;
  paymentReason: string;
  status: string;
  createdAt: string;
  tourId?: {
    addressOfTour: string;
    propertyImage: string;
    _id: string;
  };
  propertyId?: {
    address: {
      street: string;
      city: string;
      state: string;
      country: string;
      longitude: number;
      latitude: number;
    };
    photos: PhotoType[];
    _id: string;
  };
}
export interface PropertyLocation {
  id: number;
  geocode: [number, number];
  popupImg: string;
  popup: string;
}
export interface DashboardData {
  totalProperties: number;
  totalUsers: number;
  latestProperties: PropertyDataType[];
  latestUsers: UserData[];
  latestTransactions: TransactionType[];
  totalRevenue: number;
  totalTransactions: number;
}
