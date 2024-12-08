import { FaCircleXmark, FaTrailer } from 'react-icons/fa6';
import './PropertyTypeFilter.css';
import { FaChevronCircleDown, FaChevronCircleUp } from 'react-icons/fa';
import { useState } from 'react';
import { MdCabin, MdTerrain } from 'react-icons/md';
import { PiFarm } from 'react-icons/pi';
import { HiHomeModern } from 'react-icons/hi2';
import { BiSolidBuildingHouse } from 'react-icons/bi';
import { LiaCitySolid } from 'react-icons/lia';
import { BsFillHousesFill } from 'react-icons/bs';
const PropertyTypeFilter = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('Any');
  const [displayedType, setDisplayedType] = useState('Any');
  type PropertyType = {
    title: string;
    icon: JSX.Element;
  };

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
  };
  const handleDone = () => {
    setDisplayedType(selectedType);
    setIsDropdownOpen(false);
  };

  return (
    <div className="lp_pty_type_sorter">
      <button
        className="type_filter_btn"
        onClick={toggleDropdown}
        aria-expanded={isDropdownOpen}
      >
        <span className="sorting_btn_txt">
          
          {displayedType === 'Any' ? 'Property type' : displayedType}
        </span>
        <span className="btn_icon">
          {displayedType !== 'Any' ? (
            <FaCircleXmark onClick={clearSelection} />
          ) : isDropdownOpen ? (
            <FaChevronCircleUp />
          ) : (
            <FaChevronCircleDown />
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
