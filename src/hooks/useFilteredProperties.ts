import { useMemo } from 'react';
import { PropertyDataType } from '../types';
interface Filters {
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  bedroomMin?: number;
  bedroomMax?: number;
  bathroomMin?: number;
  bathroomMax?: number;
}
export const useFilteredProperties = (
  properties: PropertyDataType[],
  filters: Filters
) => {
  const {
    type,
    minPrice = 0,
    maxPrice = Infinity,
    bedroomMin = 0,
    bedroomMax = Infinity,
    bathroomMin = 0,
    bathroomMax = Infinity,
  } = filters;
  const propertyCategories = ['sale', 'rent'];
  const isCategory = propertyCategories.includes(type || '');

  return useMemo(() => {
    return properties.filter((property) => {
      const matchesCategory = isCategory ? property.propertyFor === type : true;
      const matchesPrice =
        property.price >= minPrice && property.price <= maxPrice;
      const matchesRooms =
        property.bed >= bedroomMin &&
        property.bed <= bedroomMax &&
        property.bath >= bathroomMin &&
        property.bath <= bathroomMax;
      return matchesCategory && matchesPrice && matchesRooms;
    });
  }, [
    properties,
    isCategory,
    type,
    minPrice,
    maxPrice,
    bedroomMin,
    bedroomMax,
    bathroomMin,
    bathroomMax,
  ]);
};
