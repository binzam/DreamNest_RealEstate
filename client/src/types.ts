export interface PhotoType {
  id: number;
  title: string;
  image: string;
}

export interface PropertyDataType {
  _id: string;
  street: string;
  city: string;
  state: string;
  country: string;
  price: number;
  bed: number;
  bath: number;
  sqft: number;
  uniqueId: string;
  image: string;
  photos: PhotoType[];
  category: string;
  detail: string;
  propertyFor: string;
  propertyType: string;
}

export interface PropertyCategoryType {
  id: number;
  title: string;
  count: number;
  image: string;
  categoryName: string;
}
export interface TestimonialType {
  id: number;
  name: string;
  image: string;
  message: string;
  role: string;
}
export interface UserType {
  firstName: string;
  email: string;
  role: string;
  profilePicture: string;
  id: string;
}