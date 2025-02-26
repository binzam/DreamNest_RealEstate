import { createContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
type PropertyFilterContextType = {
  priceRange: { minPrice: number; maxPrice: number };
  bedRoomsRange: { bedroomMin: number; bedroomMax: number };
  bathRoomsRange: { bathroomMin: number; bathroomMax: number };
  propertyType: string;
  searchTerm: { [key: string]: string };
  setPriceRange: (range: { minPrice: number; maxPrice: number }) => void;
  setBedRoomsRange: (range: { bedroomMin: number; bedroomMax: number }) => void;
  setBathRoomsRange: (range: {
    bathroomMin: number;
    bathroomMax: number;
  }) => void;
  setPropertyType: (type: string) => void;
  setSearchTerm: (term: { [key: string]: string }) => void;
  clearAllFilters: () => void;
  handleSearchTermChange: (matchedProperty: { [key: string]: string }) => void;
  handlePriceRangeChange: (
    minPrice: number | null,
    maxPrice: number | null
  ) => void;
  handleBedRoomsRangeChange: (
    bedroomMin: number | null,
    bedroomMax: number | null
  ) => void;
  handleBathRoomsRangeChange: (
    bathroomMin: number | null,
    bathroomMax: number | null
  ) => void;
  handlePropertyTypeChange: (propertyType: string) => void;

  sortParam: string;
  sortOrder: 'asc' | 'desc';

  handleSortChange: (param: string) => void;
  toggleSortOrder: () => void;
  searchValue: string;
  searchKey: string;
  isAnyFilterApplied: boolean;
  clearSpecificFilter: (
    filterType: 'bed' | 'bath' | 'propertyType' | 'search' | 'price'
  ) => void;
};

const PropertyFilterContext = createContext<PropertyFilterContextType | null>(
  null
);

const PropertyFilterProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const parseMaxValue = (value: string | null) =>
    value === null ? Infinity : Number(value);

  const parseMinValue = (value: string | null) =>
    value === null ? 0 : Number(value);

  const [searchTerm, setSearchTerm] = useState<{ [key: string]: string }>(
    () => {
      const term: { [key: string]: string } = {};
      searchParams.forEach((value, key) => {
        if (
          key === 'searchTerm' ||
          key === 'city' ||
          key === 'state' ||
          key === 'country' ||
          key === 'street'
        ) {
          term[key] = value;
        }
      });
      return term;
    }
  );

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

  const handleSearchTermChange = (matchedProperty: {
    [key: string]: string;
  }) => {
    setSearchTerm(matchedProperty);
    updateSearchParams({ ...matchedProperty });
  };

  const handlePriceRangeChange = (
    minPrice: number | null,
    maxPrice: number | null
  ) => {
    const min = minPrice ?? 0;
    const max = maxPrice ?? Infinity;
    setPriceRange({ minPrice: min, maxPrice: max });
    updateSearchParams({
      minPrice: min,
      maxPrice: max === Infinity ? 'Infinity' : max,
    });
  };

  const handleBedRoomsRangeChange = (
    bedroomMin: number | null,
    bedroomMax: number | null
  ) => {
    const min = bedroomMin ?? 0;
    const max = bedroomMax ?? Infinity;
    setBedRoomsRange({ bedroomMin: min, bedroomMax: max });
    updateSearchParams({
      bedroomMin: min,
      bedroomMax: max === Infinity ? 'Infinity' : max,
    });
  };

  const handleBathRoomsRangeChange = (
    bathroomMin: number | null,
    bathroomMax: number | null
  ) => {
    const min = bathroomMin ?? 0;
    const max = bathroomMax ?? Infinity;
    setBathRoomsRange({ bathroomMin: min, bathroomMax: max });
    updateSearchParams({
      bathroomMin: min,
      bathroomMax: max === Infinity ? 'Infinity' : max,
    });
  };

  const handlePropertyTypeChange = (propertyType: string) => {
    setPropertyType(propertyType);
    updateSearchParams({ propertyType });
  };
  const [sortParam, setSortParam] = useState(
    searchParams.get('sort') || 'relevance'
  );

  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(
    (searchParams.get('order') as 'asc' | 'desc') || 'asc'
  );

  const handleSortChange = (param: string) => {
    setSortParam(param);
    updateSearchParams({ sort: param });
  };

  const toggleSortOrder = () => {
    const newOrder: 'asc' | 'desc' = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    updateSearchParams({ order: newOrder });
  };

  const updateSearchParams = (newParams: Record<string, string | number>) => {
    const updatedParams = {
      ...Object.fromEntries(searchParams.entries()),
      ...Object.entries(newParams).reduce(
        (acc, [key, value]) => ({ ...acc, [key]: String(value) }),
        {}
      ),
    };

    setSearchParams(updatedParams);
  };
  const clearAllFilters = () => {
    setSearchTerm({});
    handlePriceRangeChange(null, null);
    handleBedRoomsRangeChange(null, null);
    handleBathRoomsRangeChange(null, null);
    handlePropertyTypeChange('');
    setSearchParams({});
  };
  
  const clearSpecificFilter = (
    filterType: 'bed' | 'bath' | 'propertyType' | 'search' | 'price'
  ) => {
    const newSearchParams = new URLSearchParams(searchParams);

    switch (filterType) {
      case 'price':
        newSearchParams.delete('minPrice');
        newSearchParams.delete('maxPrice');
        setPriceRange({ minPrice: 0, maxPrice: Infinity });
        break;
      case 'bed':
        newSearchParams.delete('bedroomMin');
        newSearchParams.delete('bedroomMax');
        setBedRoomsRange({ bedroomMin: 0, bedroomMax: Infinity });
        break;

      case 'bath':
        newSearchParams.delete('bathroomMin');
        newSearchParams.delete('bathroomMax');
        setBathRoomsRange({ bathroomMin: 0, bathroomMax: Infinity });
        break;

      case 'propertyType':
        newSearchParams.delete('propertyType');
        setPropertyType('');
        break;

      case 'search':
        newSearchParams.delete('searchTerm');
        newSearchParams.delete('city');
        newSearchParams.delete('state');
        newSearchParams.delete('country');
        newSearchParams.delete('street');
        setSearchTerm({});
        break;

      default:
        break;
    }

    setSearchParams(newSearchParams);
  };

  const searchKey = Object.keys(searchTerm)[0];
  const searchValue = searchTerm[searchKey];
  const isAnyFilterApplied = Array.from(searchParams.entries()).some(
    ([, value]) => value !== '' && value !== '0' && value !== 'Infinity'
  );
  return (
    <PropertyFilterContext.Provider
      value={{
        priceRange,
        bedRoomsRange,
        bathRoomsRange,
        propertyType,
        searchTerm,
        setPriceRange,
        setBedRoomsRange,
        setBathRoomsRange,
        setPropertyType,
        setSearchTerm,
        handleSearchTermChange,
        handlePriceRangeChange,
        handleBedRoomsRangeChange,
        handleBathRoomsRangeChange,
        handlePropertyTypeChange,
        sortParam,
        sortOrder,
        handleSortChange,
        toggleSortOrder,
        clearAllFilters,
        searchKey,
        searchValue,
        isAnyFilterApplied,
        clearSpecificFilter,
      }}
    >
      {children}
    </PropertyFilterContext.Provider>
  );
};

export { PropertyFilterProvider, PropertyFilterContext };
