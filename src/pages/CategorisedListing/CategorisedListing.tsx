import { useParams } from 'react-router-dom';
import { PROPERTIESDATA } from '../../propertiesData';
import { PropertyDataType } from '../../types';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import './CategorisedListing.css';
import BackButton from '../../components/BackButton/BackButton';
import { useMemo, useState } from 'react';
import {
  FaBath,
  FaBed,
  FaChevronDown,
  FaChevronUp,
  FaRulerCombined,
  FaTag,
} from 'react-icons/fa6';
const CategorisedListing = () => {
  const { category } = useParams<{ category?: string }>();
  const propertyCategories = [
    'recommended',
    'open-houses',
    'new-listings',
    'price-reduced',
    'recently-sold',
    'land',
  ];
  const categoryValue = category || '';
  const isCategory = propertyCategories.includes(categoryValue);
  const [sortParam, setSortParam] = useState<string>('relevance');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const filteredProperties = useMemo(() => {
    return PROPERTIESDATA.filter((property: PropertyDataType) => {
      return isCategory ? property.category === categoryValue : true;
    });
  }, [categoryValue, isCategory]);
  const sortedProperties = useMemo(() => {
    return [...filteredProperties].sort((a, b) => {
      const order = sortOrder === 'asc' ? 1 : -1;
      switch (sortParam) {
        case 'price':
          return (a.price - b.price) * order;
        case 'bed':
          return (a.bed - b.bed) * order;
        case 'bath':
          return (a.bath - b.bath) * order;
        case 'sqft':
          return (a.sqft - b.sqft) * order;
        default:
          return 0;
      }
    });
  }, [filteredProperties, sortParam, sortOrder]);
  const title = isCategory
    ? `${categoryValue.replace('-', ' ')}`
    : 'No matching properties';
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortParam(e.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const getSortIcon = () => {
    switch (sortParam) {
      case 'price':
        return <FaTag />;
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

  const getSortTerm = () => {
    switch (sortParam) {
      case 'price':
        return sortOrder === 'asc' ? 'Low to High' : 'High to Low';
      case 'bed':
        return sortOrder === 'asc' ? 'Fewest to Most' : 'Most to Fewest';
      case 'bath':
        return sortOrder === 'asc' ? 'Fewest to Most' : 'Most to Fewest';
      case 'sqft':
        return sortOrder === 'asc'
          ? 'Smallest to Largest'
          : 'Largest to Smallest';
      default:
        return '';
    }
  };
  return (
    <div className="listing_page">
      <BackButton />

      <div className="lising_pge_hdr">
        <h2 className="list_ttl">{title}</h2>
        <div className="count_sort">
          <div className="count">
            {filteredProperties.length}{' '}
            {filteredProperties.length === 1 ? 'property' : 'properties'}
          </div>
          <div className="sort_by">
            <label htmlFor="sort-options">Sort by</label>
            <select
              className="sort_options"
              id="sort-options"
              value={sortParam}
              onChange={handleSortChange}
            >
              <option value="relevance">Relevance</option>
              <option value="price">Price</option>
              <option value="bed">Bedrooms </option>
              <option value="bath">Bathrooms </option>
              <option value="sqft">Square Footage</option>
            </select>
          </div>

          <div className="sort_icon_term">
            <div className='icon_term'>
              <span className="sort_icon">{getSortIcon()}</span>
              <span className='sort_term'>{getSortTerm()}</span>
            </div>

            <button
              onClick={toggleSortOrder}
              className="sort_order"
              aria-label="Toggle Sort Order"
            >
              {sortOrder === 'asc' ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>
        </div>
      </div>
      <div className="listing_pge_content">
        {filteredProperties.length === 0 ? (
          <div className="no_properties_found">
            No matching properties found.
          </div>
        ) : (
          sortedProperties.map((property: PropertyDataType) => (
            <PropertyCard key={property.id} data={property} />
          ))
        )}
      </div>
    </div>
  );
};

export default CategorisedListing;
