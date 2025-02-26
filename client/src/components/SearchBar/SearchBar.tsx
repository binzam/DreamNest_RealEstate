import './SearchBar.css';
import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { MdClose } from 'react-icons/md';
import { PropertyDataType } from '../../types/propertyTypes';
import { usePropertyFilters } from '../../context/usePropertyFilters';

type SearchBarProps = {
  properties: PropertyDataType[];
  placeholder?: string;
  type?: string;
  className?: string;
  onSearchSelect?: (searchParams: { [key: string]: string }) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
  properties,
  placeholder = 'Search Address, City, Zip or Neighborhood',
  type = '',
  className = '',
  onSearchSelect,
}) => {
  const { handleSearchTermChange, clearSpecificFilter, searchValue } =
    usePropertyFilters();
  const [searchTerm, setSearchTerm] = useState(searchValue || '');
  const [suggestions, setSuggestions] = useState<
    { key: string; label: string }[]
  >([]);

  const handleSearchTermInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === '') {
      setSuggestions([]);
      return;
    }

    const lowerValue = value.toLowerCase();
    const matchingProperties = properties.filter((property) => {
      const { city, state, country, street } = property.address;
      if (type && property.propertyFor.toLowerCase() !== type.toLowerCase()) {
        return false;
      }
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
    handleSearchTermChange({});
    clearSpecificFilter('search');
  };

  const handleSuggestionClick = (value: string, key: string) => {
    clearSpecificFilter('search');
    setSearchTerm(value);
    setSuggestions([]);
    handleSearchTermChange({ [key]: value });
    if (onSearchSelect) return onSearchSelect({ [key]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm && searchTerm !== '') {
      handleSearchTermChange({ searchTerm });
    }
  };

  return (
    <div className={`search_bar_container ${className}`}>
      <form className={`search_form ${className}`} onSubmit={handleSubmit}>
        <input
          className={`search_input ${className} ${searchTerm ? 'active' : ''}`}
          type="text"
          value={searchTerm}
          placeholder={placeholder}
          onChange={handleSearchTermInputChange}
        />
        {searchTerm ? (
          <button
            type="button"
            className={`search_btn clear ${className}`}
            onClick={handleClearSearch}
          >
            <MdClose />
          </button>
        ) : (
          <button type="submit" className={`search_btn ${className}`}>
            <IoSearch />
          </button>
        )}
      </form>
      {suggestions.length > 0 && (
        <ul className={`search_result_dropdown ${className}`}>
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

export default SearchBar;
