import { UserData } from './userTypes';

export interface PhotoType {
  title: string;
  image: string;
}

export interface PropertyDataType {
  _id: string;
  owner: string | UserData;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    longitude: number;
    latitude: number;
  };
  price:  number;
  bed:  number;
  bath:  number;
  sqft:  number;
  sizeUnit: 'sqft' | 'sqm';
  uniqueId?: string;
  photos: PhotoType[];
  category: string;
  detail: string;
  propertyFor: 'sale' | 'rent';
  yearBuilt: number;
  propertyType: string;
  title: string;
  createdAt: string;
  currency: string;
  features?: string[];
  videoUrl?: string;
  contactInfo?: string;
  dateListed?: string;
  priority: string;
  isAvailable: boolean;
}

export interface PropertyCategoryType {
  id: number;
  title: string;
  count: number;
  image: string;
  categoryName: string;
}

export interface PropertySliderProps {
  title: string;
  propertyFor: string;
}
export interface PropertyListingProps {
  title: string;
}
export interface CategorizedProperty {
  category: string;
  properties: PropertyDataType[];
}
export interface PropertyFormData {
  title: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  price: number | null;
  bed: number | null;
  bath: number | null;
  sqft: number | null;
  sizeUnit: 'sqft' | 'sqm';
  photos: { title: string; image: File | null; previewUrl?: string }[];

  propertyFor: 'sale' | 'rent';
  propertyType: string;
  detail: string;
  yearBuilt: number | null;
  isAvailable: boolean;
  currency: string;
  features?: string[];
  videoUrl?: string;
  contactInfo?: string;
  dateListed?: string;
  tempPropertyId?: string;
  priority?: string;
}
export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}

export interface PropertyEditFormData {
  title: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  price: number;
  bed: number;
  bath: number;
  sqft: number;
  sizeUnit: 'sqft' | 'sqm';
  photos: { title: string; image: string; previewUrl?: string }[];

  propertyFor: 'sale' | 'rent';
  propertyType: string;
  detail: string;
  yearBuilt: number;
  isAvailable?: boolean;
  currency: string;
  features?: string[];
  videoUrl?: string;
  priority: string;
  contactInfo?: string;
  dateListed?: string;
  // tempPropertyId?: string;
}
