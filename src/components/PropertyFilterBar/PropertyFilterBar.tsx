import { useState } from 'react';
import './PropertyFilterBar.css';
import { FaChevronCircleDown, FaChevronCircleUp } from 'react-icons/fa';
import { FaChevronDown, FaChevronUp, FaCircleXmark } from 'react-icons/fa6';
const PropertyFilterBar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMinDropdownOpen, setMinDropdownOpen] = useState(false);
  const [isMaxDropdownOpen, setMaxDropdownOpen] = useState(false);
  const [selectedMin, setSelectedMin] = useState<number | null>(null);
  const [selectedMax, setSelectedMax] = useState<number | null>(null);
  const [displayText, setDisplayText] = useState('Price');
  const minValues = [
    'No min',
    '$100K',
    '$200K',
    '$300K',
    '$400K',
    '$500K',
    '$600K',
    '$700K',
  ];
  const maxValues = [
    'No max',
    '$180K',
    '$350K',
    '$500K',
    '$700K',
    '$900K',
    '$1M',
    '$1.2M',
  ];

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const toggleMinDropdown = () => setMinDropdownOpen((prev) => !prev);
  const toggleMaxDropdown = () => setMaxDropdownOpen((prev) => !prev);

  const selectMinValue = (value: number) => {
    if (selectedMax && value >= selectedMax) {
      setSelectedMax(null);
    }
    setSelectedMin(value);
    setMinDropdownOpen(false);
  };

  const selectMaxValue = (value: number) => {
    if (selectedMin && value <= selectedMin) {
      setSelectedMin(null);
    }
    setSelectedMax(value);
    setMaxDropdownOpen(false);
  };

  const clearSelection = () => {
    setSelectedMin(null);
    setSelectedMax(null);
    setDropdownOpen(!isDropdownOpen);
    setDisplayText('Price');
  };
  const handleDone = () => {
    if (selectedMin || selectedMax) {
      setDisplayText(`${selectedMin || 'No Min'} - ${selectedMax || 'No Max'}`);
    } else {
      setDisplayText('Price');
    }
    setDropdownOpen(false);
  };
  return (
    <div className="sorting_bar">
      <div className="sorting_bar_comps">
        <form className="listing_pge_search_form">
          <input
            className="lp_search_input"
            type="text"
            placeholder="Address, City, Zip or Neighborhood"
          />
          <button className="lp_search_btn">
            <svg
              data-testid="icon-magnifying-glass"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path
                fillRule="evenodd"
                d="M16.618 18.032a9 9 0 1 1 1.414-1.414l3.675 3.675a1 1 0 0 1-1.414 1.414l-3.675-3.675ZM18 11a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </form>
        <div className="main_filters">
          <div className="lp_price_sorter">
            <button className="price_filter_btn" onClick={toggleDropdown}>
              <span className="sorting_btn_txt">{displayText}</span>
              <span className="btn_icon">
                {selectedMin || selectedMax ? (
                  <FaCircleXmark onClick={clearSelection} />
                ) : isDropdownOpen ? (
                  <FaChevronCircleUp />
                ) : (
                  <FaChevronCircleDown />
                )}
              </span>
            </button>

            {isDropdownOpen && (
              <div className="price_dropdown">
                <div className="price_dd_hdr">
                  <span>Price range</span>{' '}
                  <span className="done_btn" onClick={handleDone}>
                    done
                  </span>
                </div>
                <div className="price_dropdown_inner">
                  <div className="inner_btns">
                    <button
                      className={`dropdown_btn ${
                        isMinDropdownOpen ? 'active' : ''
                      }`}
                      onClick={toggleMinDropdown}
                    >
                      {selectedMin || 'No Min'}
                      <span className="btn_icon">
                        {isMinDropdownOpen ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </span>
                    </button>
                    <div className="divider">-</div>

                    <button
                      className={`dropdown_btn ${
                        isMaxDropdownOpen ? 'active' : ''
                      }`}
                      onClick={toggleMaxDropdown}
                    >
                      {selectedMax || 'No Max'}
                      <span className="btn_icon">
                        {isMaxDropdownOpen ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
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
                              {value}
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
        </div>
      </div>
    </div>
  );
};

export default PropertyFilterBar;
