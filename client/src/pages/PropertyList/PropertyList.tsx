import { useParams, useSearchParams } from 'react-router-dom';
import './PropertyList.css';
import { useEffect, useState } from 'react';
import { PropertyDataType } from '../../types/propertyTypes';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import PropertyFilterBar from '../../components/PropertyFilterBar/PropertyFilterBar';
import BackButton from '../../components/BackButton/BackButton';
import SortingControl from '../../components/SortingControl/SortingControl';
import { useFilteredProperties } from '../../hooks/useFilteredProperties';
import { useSortedProperties } from '../../hooks/useSortedProperties';
import { AppDispatch, RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { GridLoader } from 'react-spinners';
import { useDispatch } from 'react-redux';
import { fetchProperties } from '../../store/slices/propertySlice';

const PropertyList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { properties, loading, error } = useSelector(
    (state: RootState) => state.properties
  );

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
  const handlePriceRangeChange = (minPrice: number, maxPrice: number) => {
    setPriceRange({ minPrice, maxPrice });
    updateSearchParams({ minPrice, maxPrice });
  };
  const handleBedRoomsRangeChange = (
    bedroomMin: number,
    bedroomMax: number
  ) => {
    setBedRoomsRange({ bedroomMin, bedroomMax });
    updateSearchParams({ bedroomMin, bedroomMax });
  };
  const handleBathRoomsRangeChange = (
    bathroomMin: number,
    bathroomMax: number
  ) => {
    setBathRoomsRange({ bathroomMin, bathroomMax });
    updateSearchParams({ bathroomMin, bathroomMax });
  };
  const handlePropertyTypeChange = (propertyType: string) => {
    setPropertyType(propertyType);
    updateSearchParams({ propertyType });
  };

  useEffect(() => {
    document.title = `Property Listings - ${type || 'All'}`;
    if (!properties) {
      dispatch(fetchProperties());
    }
  }, [type, properties, dispatch]);

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
  const filteredProperties = useFilteredProperties(properties, {
    type,
    minPrice: priceRange.minPrice,
    maxPrice: priceRange.maxPrice,
    bedroomMin: bedRoomsRange.bedroomMin,
    bedroomMax: bedRoomsRange.bedroomMax,
    bathroomMin: bathRoomsRange.bathroomMin,
    bathroomMax: bathRoomsRange.bathroomMax,
    propertyType: propertyType,
  });
  const sortedProperties = useSortedProperties(
    filteredProperties,
    sortParam,
    sortOrder
  );

  if (error) return <p>Error: {error}</p>;
  return (
    <div className="property_listing_page">
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
        Listings for {type ? type.toUpperCase() : 'All'}
      </h2>
      <PropertyFilterBar
        onPriceRangeChange={handlePriceRangeChange}
        onBedRoomsRangeChange={handleBedRoomsRangeChange}
        onBathRoomsRangeChange={handleBathRoomsRangeChange}
        onPropertyTypeChange={handlePropertyTypeChange}
        type={type || ''}
      />

      <SortingControl
        type={type || ''}
        count={filteredProperties.length}
        sortParam={sortParam}
        sortOrder={sortOrder}
        onSortParamChange={handleSortChange}
        onSortOrderToggle={toggleSortOrder}
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
