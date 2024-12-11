import {
  FaBath,
  FaBed,
  FaChevronDown,
  FaChevronUp,
  FaCircleXmark,
} from 'react-icons/fa6';
import './PropertyRoomFilter.css';
import { useState } from 'react';
import { FaChevronCircleDown, FaChevronCircleUp } from 'react-icons/fa';
const roomValues = ['No Min', '1', '2', '3', '4', '5', '6+'];
type DropdownState = {
  bedroomMin: boolean;
  bedroomMax: boolean;
  bathroomMin: boolean;
  bathroomMax: boolean;
};

const PropertyRoomFilter = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownState, setDropdownState] = useState({
    bedroomMin: false,
    bedroomMax: false,
    bathroomMin: false,
    bathroomMax: false,
  });

  const [selectedValues, setSelectedValues] = useState({
    bedroomMin: null,
    bedroomMax: null,
    bathroomMin: null,
    bathroomMax: null,
  });

  const [displayText, setDisplayText] = useState('Rooms');

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const toggleSpecificDropdown = (key: keyof DropdownState) =>
    setDropdownState((prev) => ({ ...prev, [key]: !prev[key] }));

  const clearSelection = () => {
    setSelectedValues({
      bedroomMin: null,
      bedroomMax: null,
      bathroomMin: null,
      bathroomMax: null,
    });
    setDropdownOpen(false);
    setDisplayText('Rooms');
  };

  const handleDone = () => {
    const bedroomText =
      selectedValues.bedroomMin || selectedValues.bedroomMax
        ? `${selectedValues.bedroomMin || 'No Min'} - ${
            selectedValues.bedroomMax || 'No Max'
          } Bed`
        : '';

    const bathroomText =
      selectedValues.bathroomMin || selectedValues.bathroomMax
        ? `${selectedValues.bathroomMin || 'No Min'} - ${
            selectedValues.bathroomMax || 'No Max'
          } Bath`
        : '';

    const text = [bedroomText, bathroomText].filter(Boolean).join(' / ');

    setDisplayText(text || 'Rooms');
    setDropdownOpen(false);
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
      <button className="room_filter_btn" onClick={toggleDropdown}>
        <span className="sorting_btn_txt">{displayText}</span>
        <span className="btn_icon">
          {Object.values(selectedValues).some((value) => value) ? (
            <FaCircleXmark onClick={clearSelection} />
          ) : isDropdownOpen ? (
            <FaChevronCircleUp />
          ) : (
            <FaChevronCircleDown />
          )}
        </span>
      </button>

      {isDropdownOpen && (
        <div className="room_dropdown">
          <div className="room_dd_hdr">
            <span>Rooms</span>{' '}
            <span className="done_btn" onClick={handleDone}>
              done
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
            <label className="room_ttl mg-t">
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

export default PropertyRoomFilter;
