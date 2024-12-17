import { useSelector } from 'react-redux';
import {
  PropertyDataType,
  PropertyListingProps,
} from '../../types/propertyTypes';
import PropertyCard from '../PropertyCard/PropertyCard';
import './PropertyListing.css';
import { RootState } from '../../store/store';

const PropertyListing = ({ category, title }: PropertyListingProps) => {
  const properties = useSelector(
    (state: RootState) => state.properties.properties
  );

  const filteredProperties = properties.filter(
    (property: PropertyDataType) => property.category === category
  );
  return (
    <section className="listing_section">
      <h1 className="listing_ttl">{title}</h1>
      <div className="listing">
        {filteredProperties.map((data: PropertyDataType) => (
          <PropertyCard key={data._id} data={data} />
        ))}
      </div>
    </section>
  );
};

export default PropertyListing;
