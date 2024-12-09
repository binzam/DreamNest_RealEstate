import './PropertyFilterBar.css';
import PropertyPriceFilter from './PropertyPriceFilter/PropertyPriceFilter';
import PropertyRoomFilter from './PropertyRoomFilter/PropertyRoomFilter';
import PropertySearch from './PropertySearch/PropertySearch';
import PropertyTypeFilter from './PropertyTypeFilter/PropertyTypeFilter';
const PropertyFilterBar = () => {
  return (
    <div className="sorting_bar">
      <div className="sorting_bar_comps">
        <PropertySearch />
        <PropertyPriceFilter />
        <PropertyTypeFilter />
        <PropertyRoomFilter />
      </div>
    </div>
  );
};

export default PropertyFilterBar;
