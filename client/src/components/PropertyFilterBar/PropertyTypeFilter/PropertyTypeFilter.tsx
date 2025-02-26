import { useEffect, useMemo, useState } from 'react';
import './PropertyTypeFilter.css';
import { FaTrailer } from 'react-icons/fa6';
import { MdCabin, MdTerrain, MdVilla } from 'react-icons/md';
import { PiFarm } from 'react-icons/pi';
import { HiHomeModern } from 'react-icons/hi2';
import { BiSolidBuildingHouse } from 'react-icons/bi';
import { LiaCitySolid } from 'react-icons/lia';
import { BsFillHousesFill } from 'react-icons/bs';
import { IoSearch } from 'react-icons/io5';
import { useSearchParams } from 'react-router-dom';
import { usePropertyFilters } from '../../../context/usePropertyFilters';
import FilterButton from '../../FilterButton/FilterButton';
type PropertyTypeFilterProps = {
  isOpen: boolean;
  onToggle: () => void;
};

const PropertyTypeFilter: React.FC<PropertyTypeFilterProps> = ({
  isOpen,
  onToggle,
}) => {
  const [searchParams] = useSearchParams();
  const [selectedType, setSelectedType] = useState('Any');

  const [displayText, setDisplayText] = useState('Property Type');
  const [isTypeSelected, setIsTypeSelected] = useState(false);
  const { handlePropertyTypeChange, clearSpecificFilter } =
    usePropertyFilters();

  const propertyTypes = useMemo(
    () => [
      { title: 'Any', icon: <BiSolidBuildingHouse /> },
      { title: 'House', icon: <HiHomeModern /> },
      { title: 'Villa', icon: <MdVilla /> },
      { title: 'Condo', icon: <LiaCitySolid /> },
      { title: 'Town house', icon: <MdCabin /> },
      { title: 'Multi family', icon: <BsFillHousesFill /> },
      { title: 'Farm', icon: <PiFarm /> },
      { title: 'Mobile', icon: <FaTrailer /> },
      { title: 'Land', icon: <MdTerrain /> },
    ],
    []
  );
  useEffect(() => {
    const urlType = searchParams.get('propertyType') || 'Any';
    setSelectedType(urlType);
    setDisplayText(urlType === 'Any' ? 'Property Type' : urlType);
    setIsTypeSelected(urlType !== 'Any');
  }, [searchParams]);

  const toggleDropdown = () => {
    onToggle(); 
  };

  const handleSelect = (type: string) => {
    setSelectedType(type);
  };
  const clearSelection = () => {
    setSelectedType('Any');
    onToggle()

    setIsTypeSelected(false);
    handlePropertyTypeChange('');
    clearSpecificFilter('propertyType');
  };
  const handleDone = () => {
    const type = selectedType === 'Any' ? '' : selectedType;
    onToggle()

    setDisplayText(type);
    setIsTypeSelected(true);
    handlePropertyTypeChange(type);
  };

  return (
    <div className="lp_pty_type_sorter">
      <FilterButton
        className="filter_btn"
        isSelected={isTypeSelected}
        isDropdownOpen={isOpen}
        toggleDropdown={toggleDropdown}
        clearSelection={clearSelection}
        displayText={displayText}
        title="Property Type"
        ariaLabel="Property type filter"
      />
      {isOpen && (
        <div className="type_dropdown">
          <div className="type_dd_hdr">
            <span>Property type</span>
            <span className="done_btn" onClick={handleDone}>
              <IoSearch /> FILTER
            </span>
          </div>
          <div className="dd_types">
            {propertyTypes.map((type, index) => (
              <div
                key={index}
                className={`dd_type ${
                  type.title === selectedType ? 'active' : ''
                }`}
                onClick={() => handleSelect(type.title)}
              >
                <div className="type_ttl">{type.title}</div>
                <div className="type_icon"> {type.icon}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyTypeFilter;
