import './PropertyFilterBar.css';
import PropertyPriceFilter from './PropertyPriceFilter/PropertyPriceFilter';
import BathroomFilter from './PropertyRoomFilter/BathroomFilter';
import BedroomFilter from './PropertyRoomFilter/BedroomFilter';
// import PropertyRoomFilter from './PropertyRoomFilter/PropertyRoomFilter';
import PropertySearch from './PropertySearch/PropertySearch';
import PropertyTypeFilter from './PropertyTypeFilter/PropertyTypeFilter';

type PropertyFilterBarProps = {
  onPriceRangeChange: (minPrice: number, maxPrice: number) => void;
  onBedRoomsRangeChange: (
    bedroomMin: number | null,
    bedroomMax: number | null
  ) => void;
  onBathRoomsRangeChange: (
    bathroomMin: number | null,
    bathroomMax: number | null
  ) => void;
  onPropertyTypeChange: (propertyType: string) => void;
  type?: string;
};

const PropertyFilterBar: React.FC<PropertyFilterBarProps> = ({
  onPriceRangeChange,
  onBedRoomsRangeChange,
  onBathRoomsRangeChange,
  onPropertyTypeChange,
  type,
}) => {
  return (
    <div className="sorting_bar">
      <div className="sorting_bar_comps">
        <PropertySearch />
        <PropertyPriceFilter
          onPriceRangeChange={onPriceRangeChange}
          type={type}
        />
        <PropertyTypeFilter onPropertyTypeChange={onPropertyTypeChange} />
        {/* <PropertyRoomFilter onRoomsRangeChange={onRoomsRangeChange} /> */}
        <BedroomFilter onBedRoomsRangeChange={onBedRoomsRangeChange} />
        <BathroomFilter onBathRoomsRangeChange={onBathRoomsRangeChange} />
      </div>
    </div>
  );
};

export default PropertyFilterBar;
