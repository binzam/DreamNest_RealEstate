import './PropertyFilterBar.css';
import PropertyPriceFilter from './PropertyPriceFilter/PropertyPriceFilter';
import PropertyRoomFilter from './PropertyRoomFilter/PropertyRoomFilter';
import PropertySearch from './PropertySearch/PropertySearch';
import PropertyTypeFilter from './PropertyTypeFilter/PropertyTypeFilter';

type PropertyFilterBarProps = {
  onPriceRangeChange: (minPrice: number, maxPrice: number) => void;
  onRoomsRangeChange: (
    bedroomMin: number,
    bedroomMax: number,
    bathroomMin: number,
    bathroomMax: number
  ) => void;
  onPropertyTypeChange: (propertyType: string) => void;
};

const PropertyFilterBar: React.FC<PropertyFilterBarProps> = ({
  onPriceRangeChange,
  onRoomsRangeChange,
  onPropertyTypeChange,
}) => {
  return (
    <div className="sorting_bar">
      <div className="sorting_bar_comps">
        <PropertySearch />
        <PropertyPriceFilter onPriceRangeChange={onPriceRangeChange} />
        <PropertyTypeFilter onPropertyTypeChange={onPropertyTypeChange} />
        <PropertyRoomFilter onRoomsRangeChange={onRoomsRangeChange} />
      </div>
    </div>
  );
};

export default PropertyFilterBar;