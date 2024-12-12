import { useParams } from 'react-router-dom';
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
  const [sortParam, setSortParam] = useState<string>('relevance');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [priceRange, setPriceRange] = useState({
    minPrice: 0,
    maxPrice: Infinity,
  });
  const [roomsRange, setRoomsRange] = useState({
    bedroomMin: 0,
    bedroomMax: Infinity,
    bathroomMin: 0,
    bathroomMax: Infinity,
  });
  const handlePriceRangeChange = (minPrice: number, maxPrice: number) => {
    setPriceRange({ minPrice, maxPrice });
  };
  const handleRoomsRangeChange = (
    bedroomMin: number,
    bedroomMax: number,
    bathroomMin: number,
    bathroomMax: number
  ) => {
    setRoomsRange({ bedroomMin, bedroomMax, bathroomMin, bathroomMax });
  };
  console.log('price range', priceRange);
  console.log('rooms range', roomsRange);

  const filteredProperties = useFilteredProperties(PROPERTIESDATA, {
    type,
    minPrice: priceRange.minPrice,
    maxPrice: priceRange.maxPrice,
    bedroomMin: roomsRange.bedroomMin,
    bedroomMax: roomsRange.bedroomMax,
    bathroomMin: roomsRange.bathroomMin,
    bathroomMax: roomsRange.bathroomMax,
  });
  const sortedProperties = useSortedProperties(
    filteredProperties,
    sortParam,
    sortOrder
  );

  useEffect(() => {
    document.title = `Property Listings - ${type || 'All'}`;
  }, [type]);

  const handleSortChange = (param: string) => {
    setSortParam(param);
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };
  return (
    <div className="property_listing_page">
      <BackButton />
      <h2 className="pty_listing_ttl">
        Listings for {type ? type.toUpperCase() : 'All'}
      </h2>
      <PropertyFilterBar
        onPriceRangeChange={handlePriceRangeChange}
        onRoomsRangeChange={handleRoomsRangeChange}
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
