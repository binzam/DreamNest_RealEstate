import { useMemo, useState } from 'react';
import './PropertyPriceFilter.css';
import { FaChevronDown, FaChevronUp, FaXmark } from 'react-icons/fa6';
import { IoSearch } from 'react-icons/io5';
type PriceOption = {
  display: string;
  value: number;
};
type PropertyPriceFilterProps = {
  onPriceRangeChange: (minPrice: number, maxPrice: number) => void;
};

const PropertyPriceFilter: React.FC<PropertyPriceFilterProps> = ({
  onPriceRangeChange,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMinDropdownOpen, setMinDropdownOpen] = useState(false);
  const [isMaxDropdownOpen, setMaxDropdownOpen] = useState(false);
  const [selectedMin, setSelectedMin] = useState<PriceOption | null>(null);
  const [selectedMax, setSelectedMax] = useState<PriceOption | null>(null);
  const [displayText, setDisplayText] = useState('Price');
  const [isRangeSelected, setIsRangeSelected] = useState(false);

  const minValues = useMemo(
    () => [
      { display: 'No Min', value: 0 },
      { display: '$100K', value: 100000 },
      { display: '$200K', value: 200000 },
      { display: '$300K', value: 300000 },
      { display: '$400K', value: 400000 },
      { display: '$500K', value: 500000 },
      { display: '$600K', value: 600000 },
      { display: '$700K', value: 700000 },
    ],
    []
  );

  const maxValues = useMemo(
    () => [
      { display: 'No Max', value: Infinity },
      { display: '$180K', value: 180000 },
      { display: '$350K', value: 350000 },
      { display: '$500K', value: 500000 },
      { display: '$700K', value: 700000 },
      { display: '$900K', value: 900000 },
      { display: '$1M', value: 1000000 },
      { display: '$1.2M', value: 1200000 },
    ],
    []
  );
  
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const toggleMinDropdown = () => setMinDropdownOpen((prev) => !prev);
  const toggleMaxDropdown = () => setMaxDropdownOpen((prev) => !prev);

  const selectMinValue = (value: PriceOption) => {
    if (selectedMax && value.value >= selectedMax.value) {
      setSelectedMax(null);
    }
    setSelectedMin(value);
    setMinDropdownOpen(false);
  };

  const selectMaxValue = (value: PriceOption) => {
    if (selectedMin && value.value <= selectedMin.value) {
      setSelectedMin(null);
    }
    setSelectedMax(value);
    setMaxDropdownOpen(false);
  };

  const clearSelection = () => {
    setSelectedMin(null);
    setSelectedMax(null);
    setDisplayText('Price');
    setDropdownOpen(!isDropdownOpen);
    onPriceRangeChange(0, Infinity);
    setIsRangeSelected(false);
  };
  const handleDone = () => {
    if (selectedMin || selectedMax) {
      setDisplayText(
        `${selectedMin?.display || 'No Min'} - ${
          selectedMax?.display || 'No Max'
        }`
      );
      const minPrice = selectedMin?.value || 0;
      const maxPrice = selectedMax?.value || Infinity;
      onPriceRangeChange(minPrice, maxPrice);
      setIsRangeSelected(true);
    } else {
      setDisplayText('Price');
    }
    setDropdownOpen(false);
  };
  return (
    <div className="lp_price_sorter">
      <button
        className={`price_filter_btn ${isRangeSelected ? 'selected' : ''}`}
        onClick={toggleDropdown}
      >
        <span className="price_sorting_btn_txt">{displayText}</span>
        <span className="price_btn_icon">
          {selectedMin || selectedMax ? (
            <span className="clear_price_btn" onClick={clearSelection}>
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
        <div className="price_dropdown">
          <div className="price_dd_hdr">
            <span>Price range</span>{' '}
            <span className="done_btn" onClick={handleDone}>
              <IoSearch /> FILTER
            </span>
          </div>
          <div className="price_dropdown_inner">
            <div className="inner_btns">
              <button
                className={`dropdown_btn ${isMinDropdownOpen ? 'active' : ''}`}
                onClick={toggleMinDropdown}
              >
                {selectedMin?.display || 'No Min'}
                <span className="inner_btn_icon">
                  {isMinDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </button>
              <div className="divider">-</div>

              <button
                className={`dropdown_btn ${isMaxDropdownOpen ? 'active' : ''}`}
                onClick={toggleMaxDropdown}
              >
                {selectedMax?.display || 'No Max'}
                <span className="inner_btn_icon">
                  {isMaxDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </button>
            </div>

            <div className="inner_dropdowns">
              <div className="min_values">
                {isMinDropdownOpen && (
                  <div className="min_inner_dropdown">
                    {minValues.map((value, index) => (
                      <button
                        key={index}
                        className="value_btn"
                        onClick={() => selectMinValue(value)}
                      >
                        {value.display}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="max_values">
                {isMaxDropdownOpen && (
                  <div className="max_inner_dropdown">
                    {maxValues.map((value, index) => (
                      <button
                        key={index}
                        className="value_btn"
                        onClick={() => selectMaxValue(value)}
                      >
                        {value.display}
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

export default PropertyPriceFilter;
