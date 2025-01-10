import { FaBed, FaChevronDown, FaChevronUp, FaXmark } from 'react-icons/fa6';
import './PropertyRoomFilter.css';
import { useEffect, useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { useSearchParams } from 'react-router-dom';

const roomMinValues = ['No Min', '1', '2', '3', '4', '5', '6'];
const roomMaxValues = ['No Max', '1', '2', '3', '4', '5', '6'];

type BedroomFilterProps = {
  onBedRoomsRangeChange: (
    bedroomMin: number | null,
    bedroomMax: number | null
  ) => void;
};

const BedroomFilter: React.FC<BedroomFilterProps> = ({
  onBedRoomsRangeChange,
}) => {
  const [searchParams] = useSearchParams();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownState, setDropdownState] = useState({
    bedroomMin: false,
    bedroomMax: false,
  });
  const [selectedValues, setSelectedValues] = useState({
    bedroomMin: null as number | null,
    bedroomMax: null as number | null,
  });

  const [displayText, setDisplayText] = useState('Bedrooms');
  const [isRangeSelected, setIsRangeSelected] = useState(false);
  useEffect(() => {
    const urlBedMin = searchParams.get('bedroomMin');
    const urlBedMax = searchParams.get('bedroomMax');

    const parsedMin = urlBedMin ? parseInt(urlBedMin, 10) : null;
    const parsedMax =
      urlBedMax === 'Infinity' || !urlBedMax ? null : parseInt(urlBedMax, 10);

    setSelectedValues({ bedroomMin: parsedMin, bedroomMax: parsedMax });
    const isDefaultRange =
      (parsedMin === 0 && parsedMax === null) ||
      (parsedMin === null && parsedMax === null);
    const bedroomText = isDefaultRange
      ? 'Bedrooms'
      : `${parsedMin ?? 'No Min'} - ${parsedMax ?? 'No Max'} Beds`;

    setDisplayText(bedroomText);
    setIsRangeSelected(!isDefaultRange);
  }, [searchParams]);
  console.log(selectedValues);
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const toggleSpecificDropdown = (key: keyof typeof dropdownState) =>
    setDropdownState((prev) => ({ ...prev, [key]: !prev[key] }));
  const clearSelection = () => {
    setSelectedValues({
      bedroomMin: null,
      bedroomMax: null,
    });
    onBedRoomsRangeChange(null, null);
    setDropdownOpen(!isDropdownOpen);
    setDisplayText('Bedrooms');
    setIsRangeSelected(false);
  };

  const handleDone = () => {
    const { bedroomMin, bedroomMax } = selectedValues;
    const isDefaultRange = bedroomMin === null && bedroomMax === null;
    const bedroomText = isDefaultRange
      ? 'Bedrooms'
      : `${bedroomMin ?? 'No Min'} - ${bedroomMax ?? 'No Max'} Beds`;

    setDisplayText(bedroomText);
    setDropdownOpen(false);
    onBedRoomsRangeChange(bedroomMin, bedroomMax);
    setIsRangeSelected(!isDefaultRange);
  };

  const selectValue = (key: 'bedroomMin' | 'bedroomMax', value: string) => {
    const parsedValue =
      value === 'No Min' || value === 'No Max' ? null : parseInt(value, 10);
    setSelectedValues((prev) => {
      if (key === 'bedroomMin' && parsedValue !== null) {
        if (prev.bedroomMax !== null && parsedValue >= prev.bedroomMax) {
          return { ...prev, bedroomMin: prev.bedroomMax - 1 };
        }
      } else if (key === 'bedroomMax' && parsedValue !== null) {
        if (prev.bedroomMin !== null && parsedValue <= prev.bedroomMin) {
          return { ...prev, bedroomMax: prev.bedroomMin + 1 };
        }
      }
      return { ...prev, [key]: parsedValue };
    });
    setDropdownState((prev) => ({ ...prev, [key]: false }));
  };

  const renderDropdownOptions = (key: 'bedroomMin' | 'bedroomMax') => {
    const values = key === 'bedroomMax' ? roomMaxValues : roomMinValues;

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
