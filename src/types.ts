export interface PropertyDataType {
  id: number;
  image: string;
  price: number;
  bed: number;
  bath: number;
  sqft: number;
  street: string;
  city: string;
  state: string;
}
export interface PropertyCategoryType {
  id: number;
  title: string;
  count: number;
  image: string;
}
export interface TestimonialType {
  id: number;
  name: string;
  image: string;
  message: string;
  role: string;
}
