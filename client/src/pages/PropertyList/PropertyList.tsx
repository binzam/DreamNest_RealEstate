import { useParams, useSearchParams } from 'react-router-dom';
import './PropertyList.css';
import { useState } from 'react';
import { PropertyDataType } from '../../types/propertyTypes';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import PropertyFilterBar from '../../components/PropertyFilterBar/PropertyFilterBar';
import BackButton from '../../components/BackButton/BackButton';
import SortingControl from '../../components/SortingControl/SortingControl';
import { useSortedProperties } from '../../hooks/useSortedProperties';
import { GridLoader } from 'react-spinners';
import { useFetchProperties } from '../../hooks/useFetchProperties';
import { usePropertyFilters } from '../../hooks/usePropertyFilters';
import useFilteredProperties from '../../hooks/useFilteredProperties';
import ErrorDisplay from '../../components/ErrorDisplay';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const PropertyList = () => {
  const { type } = useParams<{ type: string }>();
  const { user } = useSelector((state: RootState) => state.user);
  const isAdminMode = user?.role === 'admin';
  const [searchParams, setSearchParams] = useSearchParams();
  const { properties, loading, error } = useFetchProperties();
  const [listingType, setListingType] = useState('');
  const [sortParam, setSortParam] = useState(
    searchParams.get('sort') || 'relevance'
  );
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(
    (searchParams.get('order') as 'asc' | 'desc') || 'asc'
  );
  const {
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
  } = usePropertyFilters(searchParams);

  const handleSearchTermChange = (matchedProperty: {
    [key: string]: string;
  }) => {
    setSearchTerm(matchedProperty);
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

  const handleSortChange = (param: string) => {
    setSortParam(param);
  };

  const toggleSortOrder = () => {
    const newOrder: 'asc' | 'desc' = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
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
  const filteredProperties = useFilteredProperties(properties, searchTerm, {
    type,
    listingType,
    minPrice: priceRange.minPrice,
    maxPrice: priceRange.maxPrice,
    bedroomMin: bedRoomsRange.bedroomMin,
    bedroomMax: bedRoomsRange.bedroomMax,
    bathroomMin: bathRoomsRange.bathroomMin,
    bathroomMax: bathRoomsRange.bathroomMax,
    propertyType,
  });
  const sortedProperties = useSortedProperties(
    filteredProperties,
    sortParam,
    sortOrder
  );
  const searchKey = Object.keys(searchTerm)[0];
  const searchValue = searchTerm[searchKey];

  return (
    <div className="property_listing_page">
      {error && <ErrorDisplay message={error} />}

      {loading && (
        <GridLoader
          color="#13ccbb"
          margin={10}
          size={25}
          className="listing_p_loading"
        />
      )}
      <BackButton />
      <h2 className="pty_listing_ttl">
        {!type && 'All'} Properties {type ? `for ${type.toUpperCase()}` : ''}
      </h2>
      {isAdminMode && (
        <div>
          <button onClick={() => setListingType('rent')}>Rentals</button>
          <button onClick={() => setListingType('sale')}>For Sale</button>
        </div>
      )}
      <PropertyFilterBar
        properties={properties}
        onSearchTermChange={handleSearchTermChange}
        onPriceRangeChange={handlePriceRangeChange}
        onBedRoomsRangeChange={handleBedRoomsRangeChange}
        onBathRoomsRangeChange={handleBathRoomsRangeChange}
        onPropertyTypeChange={handlePropertyTypeChange}
        type={type || listingType}
      />

      <SortingControl
        type={type || listingType}
        count={filteredProperties.length}
        sortParam={sortParam}
        sortOrder={sortOrder}
        onSortParamChange={handleSortChange}
        onSortOrderToggle={toggleSortOrder}
        searchValue={searchValue}
        searchKey={searchKey}
      />
      {!loading && sortedProperties.length === 0 ? (
        <div className="no_properties_found">No matching properties found.</div>
      ) : (
        <div className="pty_listing_contnt">
          {sortedProperties.map((property: PropertyDataType) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyList;
