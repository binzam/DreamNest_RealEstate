import {
  FaChevronDown,
  FaChevronUp,
  FaTrailer,
  FaXmark,
} from 'react-icons/fa6';
import './PropertyTypeFilter.css';
import { useEffect, useMemo, useState } from 'react';
import { MdCabin, MdTerrain } from 'react-icons/md';
import { PiFarm } from 'react-icons/pi';
import { HiHomeModern } from 'react-icons/hi2';
import { BiSolidBuildingHouse } from 'react-icons/bi';
import { LiaCitySolid } from 'react-icons/lia';
import { BsFillHousesFill } from 'react-icons/bs';
import { IoSearch } from 'react-icons/io5';
import { useSearchParams } from 'react-router-dom';

type PropertyTypeFilterProps = {
  onPropertyTypeChange: (propertyType: string) => void;
};

const PropertyTypeFilter: React.FC<PropertyTypeFilterProps> = ({
  onPropertyTypeChange,
}) => {
  const [searchParams] = useSearchParams();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('Any');
  const [isTypeSelected, setIsTypeSelected] = useState(false);
  const propertyTypes = useMemo(
    () => [
      { title: 'Any', icon: <BiSolidBuildingHouse /> },
      { title: 'House', icon: <HiHomeModern /> },
      { title: 'Condo', icon: <LiaCitySolid /> },
      { title: 'Townhome', icon: <MdCabin /> },
      { title: 'Multi family', icon: <BsFillHousesFill /> },
      { title: 'Farm', icon: <PiFarm /> },
      { title: 'Mobile', icon: <FaTrailer /> },
      { title: 'Land', icon: <MdTerrain /> },
    ],
    []
  );
  const displayedType = selectedType === 'Any' ? 'Property type' : selectedType;
  useEffect(() => {
    const urlType = searchParams.get('propertyType') || 'Any';
    setSelectedType(urlType);
    setIsTypeSelected(urlType !== 'Any');
  }, [searchParams]);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleSelect = (type: string) => {
    setSelectedType(type);
  };

  const handleDone = () => {
    const type = selectedType === 'Any' ? '' : selectedType;
    setIsDropdownOpen(false);
    setIsTypeSelected(true);
    if (onPropertyTypeChange) onPropertyTypeChange(type);
  };
  const clearSelection = () => {
    setSelectedType('Any');
    setIsDropdownOpen(!isDropdownOpen);
    setIsTypeSelected(false);
    onPropertyTypeChange('');
  };
  return (
    <div className="lp_pty_type_sorter">
      <button
        className={`type_filter_btn ${isTypeSelected ? 'selected' : ''}`}
        onClick={toggleDropdown}
        aria-expanded={isDropdownOpen}
        aria-label="Property type filter"
      >
        <span className="type_sorting_btn_txt">{displayedType}</span>
        <span className="type_btn_icon">
          {isTypeSelected ? (
            <span className="clear_type_btn" onClick={clearSelection}>
              <FaXmark className="icon_clear" />
            </span>
          ) : isDropdownOpen ? (
            <FaChevronUp />
          ) : (
            <FaChevronDown />
          )}
        </span>
      </button>
      {isDropdownOpen && (
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
