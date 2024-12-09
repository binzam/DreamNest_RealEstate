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

const PropertyRoomFilter = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isBedroomMinOpen, setBedroomMinOpen] = useState(false);
  const [isBedroomMaxOpen, setBedroomMaxOpen] = useState(false);
  const [isBathroomMinOpen, setBathroomMinOpen] = useState(false);
  const [isBathroomMaxOpen, setBathroomMaxOpen] = useState(false);

  const [selectedBedroomMin, setSelectedBedroomMin] = useState<number | null>(
    null
  );
  const [selectedBedroomMax, setSelectedBedroomMax] = useState<number | null>(
    null
  );
  const [selectedBathroomMin, setSelectedBathroomMin] = useState<number | null>(
    null
  );
  const [selectedBathroomMax, setSelectedBathroomMax] = useState<number | null>(
    null
  );
  const [displayText, setDisplayText] = useState('Rooms');
  const roomValues = ['No Min', '1', '2', '3', '4', '5', '6+'];
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const toggleBedroomMin = () => setBedroomMinOpen((prev) => !prev);
  const toggleBedroomMax = () => setBedroomMaxOpen((prev) => !prev);
  const toggleBathroomMin = () => setBathroomMinOpen((prev) => !prev);
  const toggleBathroomMax = () => setBathroomMaxOpen((prev) => !prev);

  const clearSelection = () => {
    setSelectedBedroomMin(null);
    setSelectedBedroomMax(null);
    setSelectedBathroomMin(null);
    setSelectedBathroomMax(null);
    setDropdownOpen(!isDropdownOpen);
    setDisplayText('Rooms');
  };

  const handleDone = () => {
    const bedroomText =
      selectedBedroomMin || selectedBedroomMax
        ? `${selectedBedroomMin || 'No Min'} - ${
            selectedBedroomMax || 'No Max'
          } Bed`
        : '';
    const bathroomText =
      selectedBathroomMin || selectedBathroomMax
        ? `${selectedBathroomMin || 'No Min'} - ${
            selectedBathroomMax || 'No Max'
          } Bath`
        : '';
    const text = [bedroomText, bathroomText].filter(Boolean).join(' / ');

    setDisplayText(text || 'Rooms');
    setDropdownOpen(false);
  };

  const selectValue = (
    type: 'bedroomMin' | 'bedroomMax' | 'bathroomMin' | 'bathroomMax',
    value: string
  ) => {
    const parsedValue =
      value === 'No Min' || value === 'No Max' ? null : parseInt(value);
    switch (type) {
      case 'bedroomMin':
        setSelectedBedroomMin(parsedValue);
        setBedroomMinOpen(false);
        break;
      case 'bedroomMax':
        setSelectedBedroomMax(parsedValue);
        setBedroomMaxOpen(false);
        break;
      case 'bathroomMin':
        setSelectedBathroomMin(parsedValue);
        setBathroomMinOpen(false);
        break;
      case 'bathroomMax':
        setSelectedBathroomMax(parsedValue);
        setBathroomMaxOpen(false);
        break;
      default:
        break;
    }
  };

  return (
    <div className="lp_room_sorter">
      <button className="room_filter_btn" onClick={toggleDropdown}>
        <span className="sorting_btn_txt">{displayText}</span>
        <span className="btn_icon">
          {selectedBedroomMin ||
          selectedBedroomMax ||
          selectedBathroomMin ||
          selectedBathroomMax ? (
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
                className={`room_dropdown_btn ${
                  isBedroomMinOpen ? 'active' : ''
                }`}
                onClick={toggleBedroomMin}
              >
                {selectedBedroomMin || 'No Min'}
                <span className="btn_icon">
                  {isBedroomMinOpen ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </button>
              <div className="divider">-</div>
              <button
                className={`room_dropdown_btn ${
                  isBedroomMaxOpen ? 'active' : ''
                }`}
                onClick={toggleBedroomMax}
              >
                {selectedBedroomMax || 'No Max'}
                <span className="btn_icon">
                  {isBedroomMaxOpen ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </button>
            </div>
            <label className="room_ttl mg-t">
              Bathrooms <FaBath />
            </label>
            <div className="inner_btns">
              <button
                className={`room_dropdown_btn ${
                  isBathroomMinOpen ? 'active' : ''
                }`}
                onClick={toggleBathroomMin}
              >
                {selectedBathroomMin || 'No Min'}
                <span className="btn_icon">
                  {isBathroomMinOpen ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </button>
              <div className="divider">-</div>

              <button
                className={`room_dropdown_btn ${
                  isBathroomMaxOpen ? 'active' : ''
                }`}
                onClick={toggleBathroomMax}
              >
                {selectedBathroomMax || 'No Max'}
                <span className="btn_icon">
                  {isBathroomMaxOpen ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </button>
            </div>
          </div>
          <div className="room_inner_dropdowns">
            <div className="inner_bed_dropdowns">
              <div className="bed_min_dd">
                {isBedroomMinOpen && (
                  <div className="dropdown_values">
                    {roomValues.map((value, index) => (
                      <button
                        key={index}
                        className="room_value_btn"
                        onClick={() => selectValue('bedroomMin', value)}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="bed_max_dd">
                {isBedroomMaxOpen && (
                  <div className="dropdown_values">
                    {roomValues.map((value, index) => (
                      <button
                        key={index}
                        className="room_value_btn"
                        onClick={() => selectValue('bedroomMax', value)}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="inner_bath_dropdowns">
              <div className="bath_min_dd">
                {isBathroomMinOpen && (
                  <div className="dropdown_values">
                    {roomValues.map((value, index) => (
                      <button
                        key={index}
                        className="room_value_btn"
                        onClick={() => selectValue('bathroomMin', value)}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="bath_max_dd">
                {isBathroomMaxOpen && (
                  <div className="dropdown_values">
                    {roomValues.map((value, index) => (
                      <button
                        key={index}
                        className="room_value_btn"
                        onClick={() => selectValue('bathroomMax', value)}
                      >
                        {value}
                      </button>
                    ))}
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
