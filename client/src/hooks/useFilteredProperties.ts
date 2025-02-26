import { useMemo } from 'react';
import { PropertyDataType } from '../types/propertyTypes';

interface FilterCriteria {
  type?: string;
  listingType?: string;
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
  searchTerm: { [key: string]: string },
  {
    type,
    listingType,
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
    if (!properties || properties.length === 0) return [];
    const trimmedSearchTerm =
      Object.keys(searchTerm).length === 0
        ? ''
        : searchTerm[Object.keys(searchTerm)[0]]?.toLowerCase() || '';
    return properties.filter((property) => {
      if (trimmedSearchTerm) {
        const searchKey = Object.keys(
          searchTerm
        )[0] as keyof typeof property.address;
        const searchValue = trimmedSearchTerm;

        // const matchesSearch = property.address[searchKey]
        //   ?.toString()
        //   .toLowerCase()
        //   .includes(searchValue);

        // if (!matchesSearch) return false;

        const propertyValue = property.address[searchKey]
          ?.toString()
          .toLowerCase();
        if (!propertyValue || !propertyValue.includes(searchValue)) {
          return false;
        }
      }

      if (type && property.propertyFor.toLowerCase() !== type.toLowerCase()) {
        return false;
      }
      if (
        listingType &&
        property.propertyFor.toLowerCase() !== listingType.toLowerCase()
      ) {
        return false;
      }

      if (property.price < minPrice || property.price > maxPrice) {
        return false;
      }

      if (
        (bedroomMin !== null && property.bed < bedroomMin) ||
        (bedroomMax !== null && property.bed > bedroomMax)
      ) {
        return false;
      }

      if (
        (bathroomMin !== null && property.bath < bathroomMin) ||
        (bathroomMax !== null && property.bath > bathroomMax)
      ) {
        return false;
      }

      if (
        propertyType &&
        property.propertyType.toLowerCase() !== propertyType.toLowerCase()
      ) {
        return false;
      }

      return true;
    });
  }, [
    searchTerm,
    properties,
    type,
    minPrice,
    maxPrice,
    bedroomMin,
    bedroomMax,
    bathroomMin,
    bathroomMax,
    propertyType,
    listingType,
  ]);

  return filteredProperties;
};

export default useFilteredProperties;
