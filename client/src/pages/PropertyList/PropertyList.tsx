import { useParams, useSearchParams } from 'react-router-dom';
import './PropertyList.css';
import { PROPERTIESDATA } from '../../propertiesData';
import { useEffect, useState } from 'react';
import { PropertyDataType } from '../../types';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import PropertyFilterBar from '../../components/PropertyFilterBar/PropertyFilterBar';
import BackButton from '../../components/BackButton/BackButton';
import SortingControl from '../../components/SortingControl/SortingControl';
import { useFilteredProperties } from '../../hooks/useFilteredProperties';
import { useSortedProperties } from '../../hooks/useSortedProperties';

const PropertyList = () => {
  const { type } = useParams<{ type?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortParam, setSortParam] = useState(
    searchParams.get('sort') || 'relevance'
  );
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(
    (searchParams.get('order') as 'asc' | 'desc') || 'asc'
  );
  const [priceRange, setPriceRange] = useState({
    minPrice: Number(searchParams.get('minPrice')) || 0,
    maxPrice: Number(searchParams.get('maxPrice')) || Infinity,
  });
  const [roomsRange, setRoomsRange] = useState({
    bedroomMin: Number(searchParams.get('bedroomMin')) || 0,
    bedroomMax: Number(searchParams.get('bedroomMax')) || Infinity,
    bathroomMin: Number(searchParams.get('bathroomMin')) || 0,
    bathroomMax: Number(searchParams.get('bathroomMax')) || Infinity,
  });
  const [propertyType, setPropertyType] = useState(
    searchParams.get('propertyType') || ''
  );
  const handlePriceRangeChange = (minPrice: number, maxPrice: number) => {
    setPriceRange({ minPrice, maxPrice });
    updateSearchParams({ minPrice, maxPrice });
  };
  const handleRoomsRangeChange = (
    bedroomMin: number,
    bedroomMax: number,
    bathroomMin: number,
    bathroomMax: number
  ) => {
    setRoomsRange({ bedroomMin, bedroomMax, bathroomMin, bathroomMax });
    updateSearchParams({ bedroomMin, bedroomMax, bathroomMin, bathroomMax });
  };
  const handlePropertyTypeChange = (propertyType: string) => {
    setPropertyType(propertyType);
    updateSearchParams({ propertyType });
  };
  // console.log('price range', priceRange);
  // console.log('rooms range', roomsRange);

  useEffect(() => {
    document.title = `Property Listings - ${type || 'All'}`;
  }, [type]);

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
  const filteredProperties = useFilteredProperties(PROPERTIESDATA, {
    type,
    minPrice: priceRange.minPrice,
    maxPrice: priceRange.maxPrice,
    bedroomMin: roomsRange.bedroomMin,
    bedroomMax: roomsRange.bedroomMax,
    bathroomMin: roomsRange.bathroomMin,
    bathroomMax: roomsRange.bathroomMax,
    propertyType: propertyType,
  });
  const sortedProperties = useSortedProperties(
    filteredProperties,
    sortParam,
    sortOrder
  );
  return (
    <div className="property_listing_page">
      <BackButton />
      <h2 className="pty_listing_ttl">
        Listings for {type ? type.toUpperCase() : 'All'}
      </h2>
      <PropertyFilterBar
        onPriceRangeChange={handlePriceRangeChange}
        onRoomsRangeChange={handleRoomsRangeChange}
        onPropertyTypeChange={handlePropertyTypeChange}
      />

      <SortingControl
        count={filteredProperties.length}
        sortParam={sortParam}
        sortOrder={sortOrder}
        onSortParamChange={handleSortChange}
        onSortOrderToggle={toggleSortOrder}
      />
      {sortedProperties.length === 0 ? (
        <div className="no_properties_found">No matching properties found.</div>
      ) : (
        <div className="pty_listing_contnt">
          {sortedProperties.map((property: PropertyDataType) => (
            <PropertyCard key={property.id} data={property} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyList;
