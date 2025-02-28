import { FaBath, FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import './PropertyRoomFilter.css';
import { useEffect, useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { useSearchParams } from 'react-router-dom';
import { usePropertyFilters } from '../../../context/usePropertyFilters';
import FilterButton from '../../FilterButton/FilterButton';

const roomMinValues = ['No Min', '1', '2', '3', '4', '5', '6'];
const roomMaxValues = ['No Max', '1', '2', '3', '4', '5', '6'];
type BathroomFilterProps = {
  isOpen: boolean;
  onToggle: () => void;
};

const BathroomFilter: React.FC<BathroomFilterProps> = ({
  isOpen,
  onToggle,
}) => {
  const [searchParams] = useSearchParams();
  const [dropdownState, setDropdownState] = useState({
    bathroomMin: false,
    bathroomMax: false,
  });

  const [selectedValues, setSelectedValues] = useState({
    bathroomMin: null as number | null,
    bathroomMax: null as number | null,
  });

  const [displayText, setDisplayText] = useState('Bathroom');
  const [isRangeSelected, setIsRangeSelected] = useState(false);
  const { handleBathRoomsRangeChange, clearSpecificFilter } =
    usePropertyFilters();
  useEffect(() => {
    const urlBathMin = searchParams.get('bathroomMin');
    const urlBathMax = searchParams.get('bathroomMax');

    const parsedMin = urlBathMin ? parseInt(urlBathMin, 10) : null;
    const parsedMax =
      urlBathMax === 'Infinity' || !urlBathMax
        ? null
        : parseInt(urlBathMax, 10);

    setSelectedValues({ bathroomMin: parsedMin, bathroomMax: parsedMax });
    const isDefaultRange =
      (parsedMin === 0 && parsedMax === null) ||
      (parsedMin === null && parsedMax === null);
    const bathroomText = isDefaultRange
      ? 'Bathrooms'
      : `${parsedMin ?? 'No Min'} - ${parsedMax ?? 'No Max'} Baths`;

    setDisplayText(bathroomText);
    setIsRangeSelected(!isDefaultRange);
  }, [searchParams]);
  const toggleDropdown = () => {
    onToggle(); 
  };
  const toggleSpecificDropdown = (key: keyof typeof dropdownState) =>
    setDropdownState((prev) => ({ ...prev, [key]: !prev[key] }));

  const clearSelection = () => {
    setSelectedValues({
      bathroomMin: null,
      bathroomMax: null,
    });
    handleBathRoomsRangeChange(null, null);
    clearSpecificFilter('bath');
    onToggle()

    setDisplayText('Bathrooms');
    setIsRangeSelected(false);
  };

  const handleDone = () => {
    const { bathroomMin, bathroomMax } = selectedValues;
    const isDefaultRange = bathroomMin === null && bathroomMax === null;
    const bathroomText = isDefaultRange
      ? 'Bedrooms'
      : `${bathroomMin ?? 'No Min'} - ${bathroomMax ?? 'No Max'} Baths`;
    setDisplayText(bathroomText);
    onToggle()

    handleBathRoomsRangeChange(bathroomMin, bathroomMax);
    setIsRangeSelected(!isDefaultRange);
  };

  const selectValue = (key: 'bathroomMin' | 'bathroomMax', value: string) => {
    const parsedValue =
      value === 'No Min' || value === 'No Max' ? null : parseInt(value, 10);
    setSelectedValues((prev) => ({ ...prev, [key]: parsedValue }));
    setSelectedValues((prev) => {
      if (key === 'bathroomMin' && parsedValue !== null) {
        if (prev.bathroomMax !== null && parsedValue >= prev.bathroomMax) {
          return { ...prev, bathroomMin: prev.bathroomMax - 1 };
        }
      } else if (key === 'bathroomMax' && parsedValue !== null) {
        if (prev.bathroomMin !== null && parsedValue <= prev.bathroomMin) {
          return { ...prev, bathroomMax: prev.bathroomMin + 1 };
        }
      }
      return { ...prev, [key]: parsedValue };
    });
    setDropdownState((prev) => ({ ...prev, [key]: false }));
  };

  const renderDropdownOptions = (key: 'bathroomMin' | 'bathroomMax') => {
    const values = key === 'bathroomMax' ? roomMaxValues : roomMinValues;
    return values.map((value, index) => (
      <button
        key={index}
        className="room_value_btn"
        onClick={() => selectValue(key, value)}
      >
        {value}
      </button>
    ));
  };

  return (
    <div className="lp_bath_room_sorter">
      <FilterButton
        className="filter_btn"
        isSelected={isRangeSelected}
        isDropdownOpen={isOpen}
        toggleDropdown={toggleDropdown}
        clearSelection={clearSelection}
        displayText={displayText}
        title="Bathroom Range"
      />
      {isOpen && (
        <div className="bath_room_dropdown">
          <div className="room_dd_hdr">
            <span>Bathrooms</span>{' '}
            <span className="done_btn" onClick={handleDone}>
              <IoSearch /> FILTER
            </span>
          </div>
          <div className="rooms_dropdown_inner">
            <label className="room_ttl">
              Bathrooms <FaBath />
            </label>

            <div className="inner_btns">
              <button
                onClick={() => toggleSpecificDropdown('bathroomMin')}
                className={`room_dropdown_btn ${
                  dropdownState.bathroomMin ? 'active' : ''
                }`}
              >
                {selectedValues.bathroomMin || 'No Min'}
                <span>
                  {dropdownState.bathroomMin ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}
                </span>
              </button>

              <span className="divider">-</span>

              <button
                onClick={() => toggleSpecificDropdown('bathroomMax')}
                className={`room_dropdown_btn ${
                  dropdownState.bathroomMax ? 'active' : ''
                }`}
              >
                {selectedValues.bathroomMax || 'No Max'}
                <span>
                  {dropdownState.bathroomMax ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}
                </span>
              </button>
            </div>
          </div>
          <div className="room_inner_dropdowns">
            <div className="inner_bath_dropdowns">
              <div className="bath_min_dd">
                {dropdownState.bathroomMin && (
                  <div className="dropdown_values">
                    {renderDropdownOptions('bathroomMin')}
                  </div>
                )}
              </div>
              <div className="bath_max_dd">
                {dropdownState.bathroomMax && (
                  <div className="dropdown_values">
                    {renderDropdownOptions('bathroomMax')}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BathroomFilter;
