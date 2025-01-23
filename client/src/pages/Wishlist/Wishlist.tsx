import './Wishlist.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { PropertyDataType } from '../../types/propertyTypes';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import ErrorDisplay from '../../components/ErrorDisplay';

const Wishlist = () => {
  const { wishlist, loading, error } = useSelector(
    (state: RootState) => state.wishlist
  );

  return (
    <div className="wl_pge">
      <div className="wl_hdr">
        <h2>WishList Properties</h2>
      </div>
      <div className="wl_cntnt">
        {error && <ErrorDisplay message={error} />}
        {!loading && wishlist.length === 0 ? (
          <p className="no_val">No properties in your wishlist.</p>
        ) : (
          <div className="wishlist_items">
            {wishlist.map((property: PropertyDataType) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
