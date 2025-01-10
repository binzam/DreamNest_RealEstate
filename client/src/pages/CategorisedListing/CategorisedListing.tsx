import { useParams } from 'react-router-dom';
import { PropertyDataType } from '../../types/propertyTypes';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import './CategorisedListing.css';
import BackButton from '../../components/BackButton/BackButton';
import { useEffect, useMemo, useState } from 'react';
import SortingControl from '../../components/SortingControl/SortingControl';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchProperties } from '../../store/slices/propertySlice';
import { GridLoader } from 'react-spinners';
const CategorisedListing = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { category } = useParams<{ category?: string }>();
  const { properties, loading, error } = useSelector(
    (state: RootState) => state.properties
  );
  const propertyCategories = [
    'recommended',
    'open-houses',
    'new-listings',
    'price-reduced',
    'recently-sold',
    'land',
  ];
  const categoryValue = category || '';
  const isCategory = propertyCategories.includes(categoryValue);
  const [sortParam, setSortParam] = useState<string>('relevance');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  useEffect(() => {
    if (properties.length === 0) {
      dispatch(fetchProperties());
    }
  }, [dispatch, properties.length]);
  const filteredProperties = useMemo(() => {
    return properties.filter((property: PropertyDataType) => {
      return isCategory ? property.category === categoryValue : true;
    });
  }, [categoryValue, isCategory, properties]);
  const sortedProperties = useMemo(() => {
    return [...filteredProperties].sort((a, b) => {
      const order = sortOrder === 'asc' ? 1 : -1;
      switch (sortParam) {
        case 'price':
          return (a.price - b.price) * order;
        case 'bed':
          return (a.bed - b.bed) * order;
        case 'bath':
          return (a.bath - b.bath) * order;
        case 'sqft':
          return (a.sqft - b.sqft) * order;
        default:
          return 0;
      }
    });
  }, [filteredProperties, sortParam, sortOrder]);
  const title = isCategory
    ? `Listings for "${categoryValue.replace('-', ' ')}"`
    : 'No matching properties';
  const handleSortChange = (param: string) => {
    setSortParam(param);
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };
  if (loading) {
    return (
      <GridLoader
        color="#13ccbb"
        margin={10}
        size={25}
        className="listing_loading"
      />
    );
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="cat_listing_page">
      <BackButton />
      <div className="cat_lising_pge_hdr">
        <h2 className="list_ttl">{title}</h2>

        <SortingControl
          type=""
          count={filteredProperties.length}
          sortParam={sortParam}
          sortOrder={sortOrder}
          onSortParamChange={handleSortChange}
          onSortOrderToggle={toggleSortOrder}
        />
      </div>
      {filteredProperties.length === 0 ? (
        <div className="cat_no_properties_found">
          No matching properties found.
        </div>
      ) : (
        <div className="cat_listing_pge_content">
          {sortedProperties.map((property: PropertyDataType) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorisedListing;
