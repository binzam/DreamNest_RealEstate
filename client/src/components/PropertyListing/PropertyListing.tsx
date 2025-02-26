import { useFetchFeaturedProperties } from '../../hooks/useProperties';
import { PropertyDataType } from '../../types/propertyTypes';
import Container from '../Container/Container';
import { Loader } from '../Loader';
import PropertyCard from '../PropertyCard/PropertyCard';
import './PropertyListing.css';

const PropertyListing = () => {
  const { data: properties = [], isLoading } = useFetchFeaturedProperties();

  if (isLoading || !properties) {
    return <Loader />;
  }
  if (properties.length === 0) {
    return null;
  }
  return (
    <section className="listing_section">
      <Container>
        <div className="listing_section_inner">
          <h1 className="listing_ttl">Featured Properties</h1>
          <div className="listing">
            {properties.map((property: PropertyDataType) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PropertyListing;
