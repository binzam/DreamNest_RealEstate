import './PropertyFilterBar.css';
import PropertyPriceFilter from './PropertyPriceFilter/PropertyPriceFilter';
import BathroomFilter from './PropertyRoomFilter/BathroomFilter';
import BedroomFilter from './PropertyRoomFilter/BedroomFilter';
import PropertyTypeFilter from './PropertyTypeFilter/PropertyTypeFilter';
import { FaXmark } from 'react-icons/fa6';
import { PropertyDataType } from '../../types/propertyTypes';
import SearchBar from '../SearchBar/SearchBar';
import { usePropertyFilters } from '../../context/usePropertyFilters';
import Container from '../Container/Container';
import { useState } from 'react';

type PropertyFilterBarProps = {
  properties: PropertyDataType[];
  type: string;
};

const PropertyFilterBar: React.FC<PropertyFilterBarProps> = ({
  properties,
  type,
}) => {
  const { clearAllFilters, isAnyFilterApplied } = usePropertyFilters();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleDropdownToggle = (dropdownId: string) => {
    setOpenDropdown((prev) => (prev === dropdownId ? null : dropdownId));
  };
  return (
    <div className="filtering_bar">
      <Container>
        <div className="filtering_bar_comps">
          <SearchBar properties={properties} type={type} className="filter" />
          <PropertyPriceFilter
            type={type}
            isOpen={openDropdown === 'price'}
            onToggle={() => handleDropdownToggle('price')}
          />
          <PropertyTypeFilter
            isOpen={openDropdown === 'type'}
            onToggle={() => handleDropdownToggle('type')}
          />
          <BedroomFilter
            isOpen={openDropdown === 'bedroom'}
            onToggle={() => handleDropdownToggle('bedroom')}
          />
          <BathroomFilter
            isOpen={openDropdown === 'bathroom'}
            onToggle={() => handleDropdownToggle('bathroom')}
          />
          {isAnyFilterApplied && (
            <button onClick={clearAllFilters} className="clear_selection_btn">
              <FaXmark />{' '}
              <span>
                Clear <br /> Filters
              </span>
            </button>
          )}
        </div>
      </Container>
    </div>
  );
};

export default PropertyFilterBar;
