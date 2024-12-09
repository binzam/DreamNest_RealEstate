import './PropertySearch.css';
const PropertySearch = () => {
  return (
    <form className="listing_pge_search_form">
      <input
        className="lp_search_input"
        type="text"
        placeholder="Address, City, Zip or Neighborhood"
      />
      <button className="lp_search_btn">
        <svg
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
  );
};

export default PropertySearch;
