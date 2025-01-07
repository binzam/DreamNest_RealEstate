import { FaBath, FaChevronDown, FaChevronUp, FaXmark } from 'react-icons/fa6';
import './PropertyRoomFilter.css';
import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';

const roomMinValues = ['No Min', '1', '2', '3', '4', '5', '6'];
const roomMaxValues = ['No Max', '1', '2', '3', '4', '5', '6'];

type BathroomFilterProps = {
  onBathRoomsRangeChange: (
    bathroomMin: number | null,
    bathroomMax: number | null
  ) => void;
};

const BathroomFilter: React.FC<BathroomFilterProps> = ({
  onBathRoomsRangeChange,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownState, setDropdownState] = useState({
    bathroomMin: false,
    bathroomMax: false,
  });

  const [selectedValues, setSelectedValues] = useState({
    bathroomMin: null,
    bathroomMax: null,
  });

  const [displayText, setDisplayText] = useState('Bathrooms');
  const [isRangeSelected, setIsRangeSelected] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const toggleSpecificDropdown = (key: keyof typeof dropdownState) =>
    setDropdownState((prev) => ({ ...prev, [key]: !prev[key] }));

  const clearSelection = () => {
    setSelectedValues({
      bathroomMin: null,
      bathroomMax: null,
    });
    onBathRoomsRangeChange(null, null);
    setDropdownOpen(!isDropdownOpen);
    setDisplayText('Bathrooms');
    setIsRangeSelected(false);
  };

  const handleDone = () => {
    // const bathroomText =
    //   selectedValues.bathroomMin || selectedValues.bathroomMax
    //     ? `${selectedValues.bathroomMin || 'No Min'} - ${
    //         selectedValues.bathroomMax || 'No Max'
    //       } Bath`
    //     : '';
    const { bathroomMin, bathroomMax } = selectedValues;
    const bathroomText =
      bathroomMin !== null || bathroomMax !== null
        ? `${bathroomMin ?? 'No Min'} - ${bathroomMax ?? 'No Max'} Bath`
        : 'Bathrooms';
    setDisplayText(bathroomText || 'Bathrooms');
    setDropdownOpen(false);
    // onBathRoomsRangeChange(
    //   selectedValues.bathroomMin,
    //   selectedValues.bathroomMax
    // );
    // setIsRangeSelected(!!bathroomText);
    onBathRoomsRangeChange(bathroomMin, bathroomMax);
    setIsRangeSelected(bathroomMin !== null || bathroomMax !== null);
  };

  const selectValue = (key: 'bathroomMin' | 'bathroomMax', value: string) => {
    // const parsedValue = value === 'No Min' || value === 'No Max' ? null : value;
    // setSelectedValues((prev) => ({ ...prev, [key]: parsedValue }));
    // setDropdownState((prev) => ({ ...prev, [key]: false }));
    const parsedValue =
      value === 'No Min' || value === 'No Max' ? null : parseInt(value, 10);
    setSelectedValues((prev) => ({ ...prev, [key]: parsedValue }));
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
    <div className="lp_room_sorter">
      <button
        className={`room_filter_btn ${isRangeSelected ? 'selected' : ''} `}
        onClick={toggleDropdown}
      >
        <span className="room_sorting_btn_txt">{displayText}</span>
        <span className="room_btn_icon">
          {isRangeSelected ? (
            <span className="clear_room_btn" onClick={clearSelection}>
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
        <div className="room_dropdown">
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
