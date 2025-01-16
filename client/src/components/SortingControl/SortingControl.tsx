import './SortingControl.css';
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaArrowTrendUp,
  FaArrowTrendDown,
  FaSackDollar,
} from 'react-icons/fa6';
import { SortingControlProps } from '../../types/PropTypes';

const SortingControl = ({
  type,
  count,
  sortParam,
  sortOrder,
  onSortParamChange,
  onSortOrderToggle,
}: SortingControlProps) => {
  // console.log(sortParam);

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
    <div className="sort_control">
      <div className="pty_count">
        <span>{count}</span>
        {count === 1 ? 'property' : 'properties'} for {type}
      </div>
      {count > 1 && (
        <div className="sort_by">
          <label htmlFor="sort-options" className="sort_by_ttl">
            Sort by
          </label>
          <select
            className="sort_options"
            id="sort-options"
            value={sortParam}
            onChange={(e) => onSortParamChange(e.target.value)}
          >
            <option value="relevance">Relevance</option>
            <option value="price">Price</option>
            <option value="bed">Bedrooms</option>
            <option value="bath">Bathrooms</option>
            <option value="sqft">Square Footage</option>
          </select>
        </div>
      )}
      {sortParam !== 'relevance' && (
        <div className="sort_order_buttons">
          <button
            className={`sort_button ${sortOrder === 'asc' ? 'active' : ''}`}
            onClick={() => onSortOrderToggle()}
          >
            <span className="sort_term">Low to High</span>
            <FaArrowTrendUp />
          </button>
          <span className="sort_icon">{getSortIcon()}</span>
          <button
            className={`sort_button ${sortOrder === 'desc' ? 'active' : ''}`}
            onClick={() => onSortOrderToggle()}
          >
            <span className="sort_term"> High to Low</span>
            <FaArrowTrendDown />
          </button>
        </div>
      )}
    </div>
  );
};

export default SortingControl;
