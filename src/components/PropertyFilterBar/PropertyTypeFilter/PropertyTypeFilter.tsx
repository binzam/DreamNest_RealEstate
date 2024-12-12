import {
  FaChevronDown,
  FaChevronUp,
  FaTrailer,
  FaXmark,
} from 'react-icons/fa6';
import './PropertyTypeFilter.css';
import { useState } from 'react';
import { MdCabin, MdTerrain } from 'react-icons/md';
import { PiFarm } from 'react-icons/pi';
import { HiHomeModern } from 'react-icons/hi2';
import { BiSolidBuildingHouse } from 'react-icons/bi';
import { LiaCitySolid } from 'react-icons/lia';
import { BsFillHousesFill } from 'react-icons/bs';
type PropertyType = {
  title: string;
  icon: JSX.Element;
};
const PropertyTypeFilter = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('Any');
  const [displayedType, setDisplayedType] = useState('Any');
  const [isTypeSelected, setIsTypeSelected] = useState(false);

  const propertyTypes: PropertyType[] = [
    {
      title: 'Any',
      icon: <BiSolidBuildingHouse />,
    },
    {
      title: 'House',
      icon: <HiHomeModern />,
    },
    {
      title: 'Condo',
      icon: <LiaCitySolid />,
    },
    {
      title: 'Townhome',
      icon: <MdCabin />,
    },
    {
      title: 'Multi family',
      icon: <BsFillHousesFill />,
    },
    {
      title: 'Farm',
      icon: <PiFarm />,
    },
    {
      title: 'Mobile',
      icon: <FaTrailer />,
    },
    {
      title: 'Land',
      icon: <MdTerrain />,
    },
  ];
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleSelect = (type: PropertyType['title']) => {
    setSelectedType(type);
  };
  const clearSelection = () => {
    setSelectedType('Any');
    setDisplayedType('Any');
    setIsDropdownOpen(!isDropdownOpen);
    setIsTypeSelected(false);
  };
  const handleDone = () => {
    setDisplayedType(selectedType);
    setIsDropdownOpen(false);
    setIsTypeSelected(true);
  };

  return (
    <div className="lp_pty_type_sorter">
      <button
        className={`type_filter_btn ${isTypeSelected ? 'selected' : ''}`}
        onClick={toggleDropdown}
        aria-expanded={isDropdownOpen}
      >
        <span className="type_sorting_btn_txt">
          {displayedType === 'Any' ? 'Property type' : displayedType}
        </span>
        <span className="type_btn_icon">
          {displayedType !== 'Any' ? (
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
              done
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
