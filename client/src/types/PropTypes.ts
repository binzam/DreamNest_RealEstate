export interface SliderArrowProps {
  icon: string;
  className?: string;
  onClick?: () => void;
}
export interface MobileNavbarProps {
  onCloseModal: () => void;
}

export interface SortingControlProps {
  type: string;
  count: number;
  sortParam: string;
  sortOrder: 'asc' | 'desc';
  onSortParamChange: (param: string) => void;
  onSortOrderToggle: () => void;
  searchKey?: string;
  searchValue?: string;
}
export interface TestimonialType {
  id: number;
  name: string;
  image: string;
  message: string;
  role: string;
}
export interface TestimonialCardProps {
  testimony: TestimonialType;
}
export interface TourItemProps {
  propertyId: string;
  addressOfTour: string;
  propertyImage: string;
  dateOfTour: string;
  timeOfTour: string;
}
