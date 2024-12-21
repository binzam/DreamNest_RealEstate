import { useDispatch } from 'react-redux';
import './Wishlist.css';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { PropertyDataType } from '../../types/propertyTypes';
import { useEffect } from 'react';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import { fetchWishlistThunk } from '../../store/slices/wishlistThunks';

const Wishlist = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { wishlist, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    dispatch(fetchWishlistThunk());
  }, [dispatch]);

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="wl_pge">
      <div className="wl_hdr">
        <h2>WishList Properties</h2>
      </div>
      <div className="wl_cntnt">
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
