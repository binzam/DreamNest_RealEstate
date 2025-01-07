import { FaBed, FaChevronDown, FaChevronUp, FaXmark } from 'react-icons/fa6';
import './PropertyRoomFilter.css';
import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';

const roomValues = ['No Min', '1', '2', '3', '4', '5', '6'];

type BedroomFilterProps = {
  onBedRoomsRangeChange: (bedroomMin: number, bedroomMax: number) => void;
};

const BedroomFilter: React.FC<BedroomFilterProps> = ({
  onBedRoomsRangeChange,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownState, setDropdownState] = useState({
    bedroomMin: false,
    bedroomMax: false,
  });

  const [selectedValues, setSelectedValues] = useState({
    bedroomMin: 0,
    bedroomMax: 0,
  });

  const [displayText, setDisplayText] = useState('Bedrooms');
  const [isRangeSelected, setIsRangeSelected] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const toggleSpecificDropdown = (key: keyof typeof dropdownState) =>
    setDropdownState((prev) => ({ ...prev, [key]: !prev[key] }));

  const clearSelection = () => {
    setSelectedValues({
      bedroomMin: 0,
      bedroomMax: Infinity,
    });
    onBedRoomsRangeChange(0, Infinity);
    setDropdownOpen(!isDropdownOpen);
    setDisplayText('Bedrooms');
    setIsRangeSelected(false);
  };

  const handleDone = () => {
    const bedroomText =
      selectedValues.bedroomMin || selectedValues.bedroomMax
        ? `${selectedValues.bedroomMin || 'No Min'} - ${
            selectedValues.bedroomMax || 'No Max'
          } Bed`
        : '';

    setDisplayText(bedroomText || 'Bedrooms');
    setDropdownOpen(false);
    onBedRoomsRangeChange(selectedValues.bedroomMin, selectedValues.bedroomMax);
    setIsRangeSelected(!!bedroomText);
  };

  const selectValue = (key: string, value: string) => {
    const parsedValue = value === 'No Min' || value === 'No Max' ? null : value;
    setSelectedValues((prev) => ({ ...prev, [key]: parsedValue }));
    setDropdownState((prev) => ({ ...prev, [key]: false }));
  };

  const renderDropdownOptions = (key: string) =>
    roomValues.map((value, index) => (
      <button
        key={index}
        className="room_value_btn"
        onClick={() => selectValue(key, value)}
      >
        {value}
      </button>
    ));

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
            <span>Bedrooms</span>{' '}
            <span className="done_btn" onClick={handleDone}>
              <IoSearch /> FILTER
            </span>
          </div>
          <div className="rooms_dropdown_inner">
            <label className="room_ttl">
              Bedrooms <FaBed />
            </label>

            <div className="inner_btns">
              <button
                onClick={() => toggleSpecificDropdown('bedroomMin')}
                className={`room_dropdown_btn ${
                  dropdownState.bedroomMin ? 'active' : ''
                }`}
              >
                {selectedValues.bedroomMin || 'No Min'}
                <span>
                  {dropdownState.bedroomMin ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}
                </span>
              </button>

              <span className="divider">-</span>

              <button
                onClick={() => toggleSpecificDropdown('bedroomMax')}
                className={`room_dropdown_btn ${
                  dropdownState.bedroomMax ? 'active' : ''
                }`}
              >
                {selectedValues.bedroomMax || 'No Max'}
                <span>
                  {dropdownState.bedroomMax ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}
                </span>
              </button>
            </div>
          </div>
          <div className="room_inner_dropdowns">
            <div className="inner_bed_dropdowns">
              <div className="bed_min_dd">
                {dropdownState.bedroomMin && (
                  <div className="dropdown_values">
                    {renderDropdownOptions('bedroomMin')}
                  </div>
                )}
              </div>
              <div className="bed_max_dd">
                {dropdownState.bedroomMax && (
                  <div className="dropdown_values">
                    {renderDropdownOptions('bedroomMax')}
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

export default BedroomFilter;
