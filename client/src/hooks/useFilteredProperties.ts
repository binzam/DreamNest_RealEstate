import { useMemo } from 'react';
import { PropertyDataType } from '../types/propertyTypes';

interface FilterCriteria {
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  bedroomMin?: number | null;
  bedroomMax?: number | null;
  bathroomMin?: number | null;
  bathroomMax?: number | null;
  propertyType?: string;
}

const useFilteredProperties = (
  properties: PropertyDataType[],
  {
    type,
    minPrice = 0,
    maxPrice = Infinity,
    bedroomMin = null,
    bedroomMax = null,
    bathroomMin = null,
    bathroomMax = null,
    propertyType = '',
  }: FilterCriteria
) => {
  const filteredProperties = useMemo(() => {
    
  
    return properties.filter((property) => {
      // Filter by type if provided
      if (type && property.propertyFor.toLowerCase() !== type.toLowerCase()) {
        return false;
      }

      // Filter by price range
      if (property.price < minPrice || property.price > maxPrice) {
        return false;
      }

      // Filter by bedroom range
      if (
        (bedroomMin !== null && property.bed < bedroomMin) ||
        (bedroomMax !== null && property.bed > bedroomMax)
      ) {
        return false;
      }

      // Filter by bathroom range
      if (
        (bathroomMin !== null && property.bath < bathroomMin) ||
        (bathroomMax !== null && property.bath > bathroomMax)
      ) {
        return false;
      }

      // Filter by property type if provided
      if (
        propertyType &&
        property.propertyType.toLowerCase() !== propertyType.toLowerCase()
      ) {
        return false;
      }

      return true;
    });
  }, [
    properties,
    type,
    minPrice,
    maxPrice,
    bedroomMin,
    bedroomMax,
    bathroomMin,
    bathroomMax,
    propertyType,
  ]);

  return filteredProperties;
};

export default useFilteredProperties;
