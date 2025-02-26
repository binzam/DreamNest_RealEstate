import { useParams } from 'react-router-dom';
import { PropertyDataType } from '../../types/propertyTypes';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import './CategorisedListing.css';
import BackButton from '../../components/BackButton/BackButton';
import { useMemo } from 'react';
import SortingControl from '../../components/SortingControl/SortingControl';
import { GridLoader } from 'react-spinners';
import { useFetchProperties } from '../../hooks/useProperties';
import ErrorDisplay from '../../components/ErrorDisplay/ErrorDisplay';
import { useSortedProperties } from '../../hooks/useSortedProperties';
import { usePropertyFilters } from '../../context/usePropertyFilters';
import Container from '../../components/Container/Container';
const CategorisedListing = () => {
  const { category } = useParams<{ category?: string }>();
  const categoryValue = category || '';

  const { data: properties, isLoading, isError, error } = useFetchProperties();

  const propertyCategories = [
    'recommended',
    'open-houses',
    'new-listings',
    'price-reduced',
    'siingle-family',
    'recently-sold',
    'land',
  ];
  const isCategory = propertyCategories.includes(categoryValue);
  const { sortParam, sortOrder } = usePropertyFilters();
  const filteredProperties = useMemo(() => {
    if (!properties) return [];
    return properties.filter((property: PropertyDataType) =>
      isCategory ? property.category === categoryValue : true
    );
  }, [categoryValue, isCategory, properties]);

  const sortedProperties = useSortedProperties(
    filteredProperties,
    sortParam,
    sortOrder
  );

  const title = isCategory
    ? `Listings for "${categoryValue.replace('-', ' ')}"`
    : 'No matching properties';

  if (isLoading || !properties) {
    return (
      <GridLoader
        color="#13ccbb"
        margin={10}
        size={25}
        className="listing_loading"
      />
    );
  }
  if (isError) {
    return <ErrorDisplay message={error.message} />;
  }
  return (
    <Container>
      <div className="cat_listing_page">
        <BackButton />
        <div className="cat_lising_pge_hdr">
          <h2 className="list_ttl">{title}</h2>

          <SortingControl
          
            type={categoryValue}
            count={filteredProperties.length}
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
    </Container>
  );
};

export default CategorisedListing;
