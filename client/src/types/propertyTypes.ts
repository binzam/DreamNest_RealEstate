export interface PhotoType {
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

export interface PropertySliderProps {
  title: string;
  propertyCategory: string;
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
  photos: { title: string; image: File | null}[];

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