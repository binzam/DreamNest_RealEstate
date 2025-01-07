export interface PhotoType {
  title: string;
  image: string;
}

export interface PropertyDataType {
  _id: string;
  owner: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    longitude: number;
    latitude: number;
  };
  price: number;
  bed: number;
  bath: number;
  sqft: number;
  uniqueId: string;
  photos: PhotoType[];
  category: string;
  detail: string;
  propertyFor: string;
  yearBuilt: number;
  propertyType: string;
  title: string;
  createdAt: string;
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
  category: string;
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
  price: number;
  bed: number;
  bath: number;
  sqft: number;
  sizeUnit: 'sqft' | 'sqm';
  photos: { title: string; image: File | null; previewUrl: string }[];

  propertyFor: 'sale' | 'rent';
  propertyType: string;
  detail: string;
  yearBuilt: number;
  isAvailable: boolean;
  currency?: string;
  features?: string[];
  videoUrl?: string;
  contactInfo?: string;
  dateListed?: string;
}
export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}
