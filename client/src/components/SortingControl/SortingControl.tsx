import './SortingControl.css';
import { FaBed, FaBath, FaRulerCombined, FaSackDollar } from 'react-icons/fa6';
import { SortingControlProps } from '../../types/PropTypes';
import { usePropertyFilters } from '../../context/usePropertyFilters';
import { FaSortAmountDown, FaSortAmountDownAlt } from 'react-icons/fa';
import Container from '../Container/Container';

const SortingControl = ({ type, count }: SortingControlProps) => {
  const {
    sortParam,
    sortOrder,
    searchKey,
    searchValue,
    handleSortChange,
    toggleSortOrder,
  } = usePropertyFilters();
  const getSortIcon = () => {
    switch (sortParam) {
      case 'price':
        return <FaSackDollar />;
      case 'bed':
        return <FaBed />;
      case 'bath':
        return <FaBath />;
      case 'sqft':
        return <FaRulerCombined />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <div className="sort_control">
        <div className='sort_control_first'>
          <div className="pty_count">
            <div className="pty_counter">
              <span>{count}</span>
              {count === 1 ? 'property' : 'properties'}{' '}
              {type !== '' && `for ${type}`}
            </div>
            <small>
              {searchKey &&
                searchValue &&
                `around ${searchValue}
  ${searchKey}`}
            </small>
          </div>
          {count > 1 && (
            <div className="sort_by">
              <label htmlFor="sort-options" className="sort_by_ttl"></label>
              <select
                className="sort_options"
                id="sort-options"
                value={sortParam}
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value="relevance">Relevance</option>
                <option value="price">Price</option>
                <option value="bed">Bedrooms</option>
                <option value="bath">Bathrooms</option>
                <option value="sqft">Square Footage</option>
              </select>
            </div>
          )}
        </div>
        {sortParam !== 'relevance' && (
          <div className="sort_order_buttons">
            <button
              className={`sort_button ${sortOrder === 'asc' ? 'active' : ''}`}
              onClick={() => toggleSortOrder()}
            >
              <span className="sort_term">Low to High</span>
              <FaSortAmountDownAlt />
            </button>
            <span className="sort_icon">{getSortIcon()}</span>
            <button
              className={`sort_button ${sortOrder === 'desc' ? 'active' : ''}`}
              onClick={() => toggleSortOrder()}
            >
              <span className="sort_term"> High to Low</span>
              <FaSortAmountDown />
            </button>
          </div>
        )}
      </div>
    </Container>
  );
};

export default SortingControl;
