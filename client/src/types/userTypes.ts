export interface UserProfile {
  _id: string;
  email: string;
  role: string;
  profilePicture: string;
  id: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  propertiesListed: number;
  wishlistCount: number;
  propertyCount: number;
  phoneNumber: string;
  tourScheduleCount: number;
}
export interface UserProfileUpdate {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}
export interface UserData {
  _id: string;
  role: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  profilePicture: string;
  createdAt: string;
  propertiesListed: number;
}
export interface PrimaryUserData {
  _id: string;
  role: string;
  email: string;
  firstName: string;
  profilePicture: string;
}
