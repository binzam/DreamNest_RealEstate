import { useParams } from 'react-router-dom';
import { PROPERTIESDATA } from '../../propertiesData';
import { PropertyDataType } from '../../types';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import './CategorisedListing.css';
import BackButton from '../../components/BackButton/BackButton';
import { useState } from 'react';
import PropertyFilterBar from '../../components/PropertyFilterBar/PropertyFilterBar';
const CategorisedListing = () => {
  const { filter } = useParams<{ filter?: string }>();
  const propertyCategories = [
    'recommended',
    'open-houses',
    'new-listings',
    'price-reduced',
    'recently-sold',
    'land',
  ];
  const propertyTypes = ['sale', 'rent'];
  // default value for filter
  const filterValue = filter || '';
  const isCategory = propertyCategories.includes(filterValue);
  const isType = propertyTypes.includes(filterValue);
  const [sortParam, setSortParam] = useState<string>('relevance');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const filteredProperties = PROPERTIESDATA.filter(
    (property: PropertyDataType) => {
      console.log(property.category);

      if (!property) return false;
      if (isCategory) return property.category === filterValue;
      if (isType) return property.propertyFor === filterValue;
      return false;
    }
  );
  // Sorting logic
  const sortedProperties = [...filteredProperties].sort((a, b) => {
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
        // Relevance (default order of data)
        return 0;
    }
  });
  const title = isCategory
    ? `Category: ${filterValue.replace('-', ' ')}`
    : isType
    ? `Properties for ${filterValue.replace('-', ' ')}`
    : 'No matching properties';
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortParam(e.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div className="listing_page">
      <BackButton />
      <PropertyFilterBar />
      <div className="lising_pge_hdr">
        <h2 className="list_ttl">{title}</h2>
        <div className="count_sort">
          <div className="count">{filteredProperties.length} properties</div>
          {/* <div className="sort_by">sort by relevance</div> */}
          <div className="sort_by">
            <label htmlFor="sort-options">Sort by:</label>
            <select
              id="sort-options"
              value={sortParam}
              onChange={handleSortChange}
            >
              <option value="relevance">Relevance</option>
              <option value="price">Newest Lisiting</option>
              <option value="price">Lowest Price</option>
              <option value="bed">Highest Price</option>
              <option value="bath">Newly Built</option>
              <option value="sqft">Largest Sqft.</option>
            </select>
            <button onClick={toggleSortOrder}>
              {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
            </button>
          </div>
        </div>
      </div>
      <div className="listing_pge_content">
        {sortedProperties.map((data: PropertyDataType) => (
          <PropertyCard key={data.id} data={data} />
        ))}
      </div>
    </div>
  );
};

export default CategorisedListing;
