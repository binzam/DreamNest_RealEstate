import PropertySlider from '../../components/PropertySlider/PropertySlider';
import { PROPERTIESDATA } from '../../propertiesData';
import './Listings.css';
const Listings = () => {
  const uniqueCategories = Array.from(
    new Set(PROPERTIESDATA.map((property) => property.category))
  );
  return (
    <div className="all_listings">
      {uniqueCategories.map((category) => (
        <PropertySlider
          key={category}
          title={category}
          propertyCategory={category}
        />
      ))}
    </div>
  );
};

export default Listings;
