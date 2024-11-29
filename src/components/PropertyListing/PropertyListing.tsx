import { PROPERTIESDATA } from '../../propertiesData';
import { PropertyDataType } from '../../types';
import PropertyCard from '../PropertyCard/PropertyCard';
import './PropertyListing.css';
interface PropertyListingProps {
  category: string;
  title: string;
}

const PropertyListing = ({ category, title }: PropertyListingProps) => {
  const filteredProperties = PROPERTIESDATA.filter(
    (data: PropertyDataType) => data.category === category
  ).slice(0, 3);
  return (
    <section className="listing_section">
      <h1 className="listing_ttl">{title}</h1>
      <div className="listing">
        {filteredProperties.map((data: PropertyDataType) => (
          <PropertyCard key={data.id} data={data} />
        ))}
      </div>
    </section>
  );
};

export default PropertyListing;
