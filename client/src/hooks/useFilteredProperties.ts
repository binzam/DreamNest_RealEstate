import { useMemo } from 'react';
import { PropertyDataType } from '../types/propertyTypes';
interface Filters {
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  bedroomMin?: number | null;
  bedroomMax?: number | null;
  bathroomMin?: number | null;
  bathroomMax?: number | null;
  propertyType?: string;
}
export const useFilteredProperties = (
  properties: PropertyDataType[],
  filters: Filters
) => {
  const {
    type,
    minPrice = 0,
    maxPrice = Infinity,
    bedroomMin,
    bedroomMax ,
    bathroomMin,
    bathroomMax ,
    propertyType,
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
      const matchesPropertyType =
        !propertyType || property.propertyType.toLocaleLowerCase() === propertyType.toLocaleLowerCase();
      return (
        matchesCategory && matchesPrice && matchesRooms && matchesPropertyType
      );
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
    propertyType,
  ]);
};
