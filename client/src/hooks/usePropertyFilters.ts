import { useState } from 'react';

export const usePropertyFilters = (searchParams: URLSearchParams) => {
  const [priceRange, setPriceRange] = useState({
    minPrice: Number(searchParams.get('minPrice')) || 0,
    maxPrice: Number(searchParams.get('maxPrice')) || Infinity,
  });
  const [bedRoomsRange, setBedRoomsRange] = useState({
    bedroomMin: Number(searchParams.get('bedroomMin')) || null,
    bedroomMax: Number(searchParams.get('bedroomMax')) || null,
  });
  const [bathRoomsRange, setBathRoomsRange] = useState({
    bathroomMin: Number(searchParams.get('bathroomMin')) || null,
    bathroomMax: Number(searchParams.get('bathroomMax')) || null,
  });
  const [propertyType, setPropertyType] = useState(
    searchParams.get('propertyType') || ''
  );

  return {
    priceRange,
    bedRoomsRange,
    bathRoomsRange,
    propertyType,
    setPriceRange,
    setBedRoomsRange,
    setBathRoomsRange,
    setPropertyType,
  };
};
