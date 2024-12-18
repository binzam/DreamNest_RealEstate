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
