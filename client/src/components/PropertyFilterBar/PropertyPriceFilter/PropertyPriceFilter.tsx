import { useEffect, useMemo, useState } from 'react';
import './PropertyPriceFilter.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import { IoSearch } from 'react-icons/io5';
import { useSearchParams } from 'react-router-dom';
import { usePropertyFilters } from '../../../context/usePropertyFilters';
import FilterButton from '../../FilterButton/FilterButton';
type PriceOption = {
  display: string;
  value: number;
};
type PropertyPriceFilterProps = {
  type: string;
  isOpen: boolean;
  onToggle: () => void;
};

const PropertyPriceFilter: React.FC<PropertyPriceFilterProps> = ({ type , isOpen, onToggle}) => {
  const [searchParams] = useSearchParams();
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMinDropdownOpen, setMinDropdownOpen] = useState(false);
  const [isMaxDropdownOpen, setMaxDropdownOpen] = useState(false);
  const [selectedMin, setSelectedMin] = useState<PriceOption | null>(null);
  const [selectedMax, setSelectedMax] = useState<PriceOption | null>(null);

  const [displayText, setDisplayText] = useState('Price');
  const [isRangeSelected, setIsRangeSelected] = useState(false);
  const { handlePriceRangeChange, clearSpecificFilter } = usePropertyFilters();
  const minValues = useMemo(
    () =>
      type === 'rent'
        ? [
            { display: 'No Min', value: 0 },
            { display: '$250', value: 250 },
            { display: '$500', value: 500 },
            { display: '$750', value: 750 },
            { display: '$1000', value: 1000 },
            { display: '$1250', value: 1250 },
            { display: '$1500', value: 1500 },
            { display: '$1750', value: 1750 },
          ]
        : [
            { display: 'No Min', value: 0 },
            { display: '$100K', value: 100000 },
            { display: '$300K', value: 300000 },
            { display: '$700K', value: 700000 },
            { display: '$1M', value: 1000000 },
            { display: '$2M', value: 2000000 },
            { display: '$2.5M', value: 2500000 },
            { display: '$3M', value: 3000000 },
          ],
    [type]
  );

  const maxValues = useMemo(
    () =>
      type === 'rent'
        ? [
            { display: 'No Max', value: Infinity },
            { display: '$1150', value: 1150 },
            { display: '$1350', value: 1350 },
            { display: '$1650', value: 1650 },
            { display: '$1850', value: 1850 },
            { display: '$2150', value: 2150 },
            { display: '$2350', value: 2350 },
            { display: '$2500', value: 2500 },
          ]
        : [
            { display: 'No Max', value: Infinity },
            { display: '$250K', value: 250000 },
            { display: '$550K', value: 550000 },
            { display: '$1M', value: 1000000 },
            { display: '$2.5M', value: 2500000 },
            { display: '$4M', value: 4000000 },
            { display: '$7M', value: 7000000 },
            { display: '$10M', value: 10000000 },
          ],
    [type]
  );

  useEffect(() => {
    const urlMin = searchParams.get('minPrice');
    const urlMax = searchParams.get('maxPrice');

    const parsedMin = urlMin ? parseInt(urlMin, 10) : 0;
    const parsedMax =
      urlMax === 'Infinity' || !urlMax ? Infinity : parseInt(urlMax, 10);

    const minOption = minValues.find((v) => v.value === parsedMin) || null;
    const maxOption = maxValues.find((v) => v.value === parsedMax) || null;

    setSelectedMin(minOption);
    setSelectedMax(maxOption);
    const isDefaultRange = parsedMin === 0 && parsedMax === Infinity;
    setDisplayText(
      isDefaultRange
        ? 'Price'
        : `${minOption?.display || 'No Min'} - ${
            maxOption?.display || 'No Max'
          }`
    );
    setIsRangeSelected(!isDefaultRange);
  }, [searchParams, minValues, maxValues]);
  const toggleDropdown = () => {
    onToggle(); 
    // setIsDropdownOpen((prev) => !prev);
  };
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
    handlePriceRangeChange(0, Infinity);
    clearSpecificFilter('price');
    // setIsDropdownOpen(!isDropdownOpen);
    onToggle()

    setIsRangeSelected(false);
  };
  const handleDone = () => {
    const minPrice = selectedMin?.value || 0;
    const maxPrice = selectedMax?.value || Infinity;
    const isDefaultRange = minPrice === 0 && maxPrice === Infinity;
    setDisplayText(
      isDefaultRange
        ? 'Price'
        : `${selectedMin?.display || 'No Min'} - ${
            selectedMax?.display || 'No Max'
          }`
    );
    handlePriceRangeChange(minPrice, maxPrice);
    setIsRangeSelected(!isDefaultRange);
    // setIsDropdownOpen(false);
    onToggle()

  };
  return (
    <div className="lp_price_sorter">
      <FilterButton
        className="filter_btn"
        isSelected={isRangeSelected}
        isDropdownOpen={isOpen}
        toggleDropdown={toggleDropdown}
        clearSelection={clearSelection}
        displayText={displayText}
        title="Price Range"
      />
      {isOpen && (
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
