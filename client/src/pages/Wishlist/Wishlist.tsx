import './Wishlist.css';
import { PropertyDataType } from '../../types/propertyTypes';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import ErrorDisplay from '../../components/ErrorDisplay/ErrorDisplay';
import { useLocation, useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton/BackButton';
import { useFetchWishlist } from '../../hooks/useWishlist';
import { Loader } from '../../components/Loader';
import { useUser } from '../../context/useUser';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import Container from '../../components/Container/Container';

interface WishlistProps {
  isAdminView?: boolean;
}

const Wishlist = ({ isAdminView = false }: WishlistProps) => {
  const { state } = useUser();
  const { isAuthenticated } = state;
  const { userId } = useParams<{ userId?: string }>();
  const location = useLocation();
  const userEmail = new URLSearchParams(location.search).get('user-email');

  // console.log()
  const {
    data: wishlist = [],
    isLoading,
    error,
  } = useFetchWishlist(isAuthenticated, userId);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="wl_pge">
      <div className="wl_hdr">
        <Container>
          <div className="wl_hdr_inner">
            <BackButton className="white" />
            <div>
              <h2>{isAdminView ? 'Wishlisted Propeties' : 'Your Wishlist'}</h2>
              <div className="hdr_flex">
                <IoMdInformationCircleOutline />
                <p>
                  {isAdminView
                    ? 'This user has added these propeties to his/hers wishlist'
                    : 'You have added these properties to your wishlist.'}
                </p>
              </div>
              {isAdminView && (
                <p>
                  <strong>{userEmail}</strong>{' '}
                </p>
              )}
            </div>
          </div>
        </Container>
      </div>
      <Container>
        <div className="wl_cntnt">
          {error && <ErrorDisplay message={error.message} />}
          {!isLoading && (!wishlist || wishlist.length === 0) ? (
            <p className="no_val">
              {isAdminView
                ? 'This user has no properties in their wishlist.'
                : ' No properties in your wishlist.'}
            </p>
          ) : (
            <div className="wishlist_items">
              {wishlist?.map((property: PropertyDataType) => (
                <PropertyCard
                  key={property._id}
                  property={property}
                  adminMode={isAdminView}
                />
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Wishlist;
