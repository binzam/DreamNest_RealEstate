import { useState } from 'react';
import './PropertySearch.css';
import { IoSearch } from 'react-icons/io5';
import { PropertyDataType } from '../../../types/propertyTypes';
import { MdClose } from 'react-icons/md';

type PropertySearchProps = {
  onSearchTermChange: (searchTerm: { [key: string]: string }) => void;
  properties: PropertyDataType[];
  type: string;
};

const PropertySearch: React.FC<PropertySearchProps> = ({
  onSearchTermChange,
  properties,
  type,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<
    { key: string; label: string }[]
  >([]);

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === '') {
      setSuggestions([]);
      return;
    }

    const matchingProperties = properties.filter((property) => {
      const { city, state, country, street } = property.address;
      const lowerValue = value.toLowerCase();
      const matchesType =
        property.propertyFor.toLowerCase() === type.toLowerCase();
      if (!matchesType) return false;
      return (
        city.toLowerCase().includes(lowerValue) ||
        state.toLowerCase().includes(lowerValue) ||
        country.toLowerCase().includes(lowerValue) ||
        street.toLowerCase().includes(lowerValue)
      );
    });
    const newSuggestions = Array.from(
      new Set(
        matchingProperties.flatMap((property) => {
          const { city, state, country, street } = property.address;
          return [
            { key: 'city', label: city },
            { key: 'state', label: state },
            { key: 'country', label: country },
            { key: 'street', label: street },
          ];
        })
      )
    );

    setSuggestions(newSuggestions);
  };
  const handleClearSearch = () => {
    setSearchTerm('');
    setSuggestions([]);
    onSearchTermChange({});
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchTermChange({ searchTerm });
  };
  const handleSuggestionClick = (value: string, key: string) => {
    const matchedProperty = { [key]: value };

    setSearchTerm(value);
    setSuggestions([]);
    onSearchTermChange(matchedProperty);
  };
  return (
    <div className="search_bar_container">
      <form className="listing_pge_search_form" onSubmit={handleSubmit}>
        <input
          className={`lp_search_input ${searchTerm ? 'active' : ''}`}
          type="text"
          value={searchTerm}
          placeholder="Address, City, Zip or Neighborhood"
          onChange={handleSearchTermChange}
        />
        {searchTerm ? (
          <button
            type="button"
            className="lp_search_btn clear"
            onClick={handleClearSearch}
          >
            <MdClose />
          </button>
        ) : (
          <button className="lp_search_btn">
            <IoSearch />
          </button>
        )}
      </form>
      {suggestions.length > 0 && (
        <ul className="search_result_dropdown">
          <li className="results_ttl">Search Results</li>
          {suggestions.map(({ key, label }, index) => (
            <li
              key={index}
              className="search_result_item"
              onClick={() => handleSuggestionClick(label, key)}
            >
              <span className="result_label">"{label}"</span>{' '}
              <span className="result_key">{key}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PropertySearch;
