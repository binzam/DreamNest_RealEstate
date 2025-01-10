import { useState } from 'react';

export const usePropertyFilters = (searchParams: URLSearchParams) => {
  const parseMaxValue = (value: string | null) =>
    value === null ? Infinity : Number(value);

  const parseMinValue = (value: string | null) =>
    value === null ? 0 : Number(value);

  const [priceRange, setPriceRange] = useState({
    minPrice: parseMinValue(searchParams.get('minPrice')),
    maxPrice: parseMaxValue(searchParams.get('maxPrice')),
  });

  const [bedRoomsRange, setBedRoomsRange] = useState({
    bedroomMin: parseMinValue(searchParams.get('bedroomMin')),
    bedroomMax: parseMaxValue(searchParams.get('bedroomMax')),
  });

  const [bathRoomsRange, setBathRoomsRange] = useState({
    bathroomMin: parseMinValue(searchParams.get('bathroomMin')),
    bathroomMax: parseMaxValue(searchParams.get('bathroomMax')),
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
