import { useSearchParams } from 'react-router-dom';
import './PropertyFilterBar.css';
import PropertyPriceFilter from './PropertyPriceFilter/PropertyPriceFilter';
import BathroomFilter from './PropertyRoomFilter/BathroomFilter';
import BedroomFilter from './PropertyRoomFilter/BedroomFilter';
import PropertySearch from './PropertySearch/PropertySearch';
import PropertyTypeFilter from './PropertyTypeFilter/PropertyTypeFilter';
import { FaXmark } from 'react-icons/fa6';
import { PropertyDataType } from '../../types/propertyTypes';

type PropertyFilterBarProps = {
  onPriceRangeChange: (
    minPrice: number | null,
    maxPrice: number | null
  ) => void;
  onBedRoomsRangeChange: (
    bedroomMin: number | null,
    bedroomMax: number | null
  ) => void;
  onBathRoomsRangeChange: (
    bathroomMin: number | null,
    bathroomMax: number | null
  ) => void;
  onPropertyTypeChange: (propertyType: string) => void;
  onSearchTermChange: (searchTerm: { [key: string]: string }) => void; 
  properties: PropertyDataType[];
  type: string;
};

const PropertyFilterBar: React.FC<PropertyFilterBarProps> = ({
  onPriceRangeChange,
  onBedRoomsRangeChange,
  onBathRoomsRangeChange,
  onPropertyTypeChange,
  onSearchTermChange,
  properties,
  type,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isAnyFilterApplied = Array.from(searchParams.entries()).some(
    ([, value]) => value !== '' && value !== '0' && value !== 'Infinity'
  );

  const clearAllSelections = () => {
    onPriceRangeChange(null, null);
    onBedRoomsRangeChange(null, null);
    onBathRoomsRangeChange(null, null);
    onPropertyTypeChange('');

    setSearchParams({});
  };

  return (
    <div className="filtering_bar">
      <div className="filtering_bar_comps">
        <PropertySearch
          properties={properties}
          onSearchTermChange={onSearchTermChange}
          type={type}
        />
        <PropertyPriceFilter
          onPriceRangeChange={onPriceRangeChange}
          type={type}
        />
        <PropertyTypeFilter onPropertyTypeChange={onPropertyTypeChange} />
        <BedroomFilter onBedRoomsRangeChange={onBedRoomsRangeChange} />
        <BathroomFilter onBathRoomsRangeChange={onBathRoomsRangeChange} />
        {isAnyFilterApplied && (
          <button onClick={clearAllSelections} className="clear_selection_btn">
            <FaXmark /> <span>Clear <br /> Filters</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default PropertyFilterBar;
