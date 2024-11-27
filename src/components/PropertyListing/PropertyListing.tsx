import { PROPERTIESDATA } from '../../propertiesData';
import { PropertyDataType } from '../../types';
import PropertyCard from '../PropertyCard/PropertyCard';
import './PropertyListing.css';
const PropertyListing = () => {
  return (
    <section className="listing_section">
      <h1 className="listing_ttl">Recommended Homes</h1>
      <div className="listing">
        {PROPERTIESDATA.map((data: PropertyDataType) => (
          <PropertyCard key={data.id} data={data} />
        ))}
      </div>
    </section>
  );
};

export default PropertyListing;
