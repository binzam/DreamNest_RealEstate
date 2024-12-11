import { useParams } from 'react-router-dom';
import { PROPERTIESDATA } from '../../propertiesData';
import { PropertyDataType } from '../../types';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import './CategorisedListing.css';
import BackButton from '../../components/BackButton/BackButton';
import { useMemo, useState } from 'react';
import SortingControl from '../../components/SortingControl/SortingControl';
const CategorisedListing = () => {
  const { category } = useParams<{ category?: string }>();
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
  const filteredProperties = useMemo(() => {
    return PROPERTIESDATA.filter((property: PropertyDataType) => {
      return isCategory ? property.category === categoryValue : true;
    });
  }, [categoryValue, isCategory]);
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
  return (
    <div className="cat_listing_page">
      <BackButton />
      <div className="cat_lising_pge_hdr">
        <h2 className="list_ttl">{title}</h2>

        <SortingControl
          count={filteredProperties.length}
          sortParam={sortParam}
          sortOrder={sortOrder}
          onSortParamChange={handleSortChange}
          onSortOrderToggle={toggleSortOrder}
        />
      </div>
      <div className="cat_listing_pge_content">
        {filteredProperties.length === 0 ? (
          <div className="no_properties_found">
            No matching properties found.
          </div>
        ) : (
          sortedProperties.map((property: PropertyDataType) => (
            <PropertyCard key={property.id} data={property} />
          ))
        )}
      </div>
    </div>
  );
};

export default CategorisedListing;
