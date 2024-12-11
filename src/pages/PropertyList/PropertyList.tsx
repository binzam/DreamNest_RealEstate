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

  const filteredProperties = useFilteredProperties(PROPERTIESDATA, type);

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
      <PropertyFilterBar />

      <SortingControl
        count={filteredProperties.length}
        sortParam={sortParam}
        sortOrder={sortOrder}
        onSortParamChange={handleSortChange}
        onSortOrderToggle={toggleSortOrder}
      />
      <div className="pty_listing_contnt">
        {sortedProperties.length === 0 ? (
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

export default PropertyList;
