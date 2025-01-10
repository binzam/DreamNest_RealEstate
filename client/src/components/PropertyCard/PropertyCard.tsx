import {
  FaBath,
  FaBed,
  FaDeleteLeft,
  FaHeart,
  FaLocationDot,
  FaRulerCombined,
} from 'react-icons/fa6';
import { PropertyDataType } from '../../types/propertyTypes';
import './PropertyCard.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { useMemo, useState } from 'react';
import {
  addToWishlistThunk,
  removeFromWishlistThunk,
} from '../../store/slices/wishlistThunks';
import { GridLoader } from 'react-spinners';
import { formatDistance } from 'date-fns';
import { MdOutlineBrowserUpdated } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
interface PropertyCardProps {
  property: PropertyDataType;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}
const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onEdit,
  onDelete,
}) => {
  const {
    _id,
    photos,
    propertyFor,
    price,
    bed,
    bath,
    sqft,
    address,
    propertyType,
    createdAt,
    currency,
  } = property;
  const { city, street, state } = address;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { wishlist } = useSelector((state: RootState) => state.user);
  const [loadingProperty, setLoadingProperty] = useState<string | null>(null);
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const userId = useSelector((state: RootState) => state.user.user?._id);

  const isInWishlist = useMemo(
    () => wishlist.some((wishlistItem) => wishlistItem._id === _id),
    [wishlist, _id]
  );

  const handleAddToWish = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setLoadingProperty(_id);
    dispatch(addToWishlistThunk(_id)).finally(() => {
      setLoadingProperty(null);
    });
  };
  const handleRemoveFromWish = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setLoadingProperty(_id);
    dispatch(removeFromWishlistThunk(_id)).finally(() => {
      setLoadingProperty(null);
    });
  };
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };
 
  return (
    <article className={`pty_box ${isInWishlist ? 'wishlisted' : ''}`}>
      {loadingProperty === _id && (
        <GridLoader
          color="#f38b8b"
          margin={30}
          size={25}
          className="pty_box_loading"
        />
      )}
      {property.owner !== userId && (
        <button
          className={isInWishlist ? 'wish_btn filled' : 'wish_btn'}
          onClick={isInWishlist ? handleRemoveFromWish : handleAddToWish}
        >
          <FaHeart
            className={isInWishlist ? 'icon_heart filled' : 'icon_heart'}
          />
        </button>
      )}
      {property.owner === userId && (onEdit || onDelete) && (
        <div className="owner_actions">
          {onEdit && (
            <button className="edit_btn" onClick={() => onEdit(_id)}>
              <FaEdit />
              Edit
            </button>
          )}
          {onDelete && (
            <button className="del_btn" onClick={() => onDelete(_id)}>
              <FaDeleteLeft />
              Delete
            </button>
          )}
        </div>
      )}
      <Link to={`/property-detail/${_id}`}>
        <div className="pty_img">
          <img
            width={400}
            height={250}
            src={photos[0].image}
            alt=""
            loading="lazy"
          />
        </div>
      </Link>
      <div>
        <Link to={`/property-detail/${_id}`}>
          <div className="pty_box_body">
            <div className="pty_purpose">
              <span className="dot"></span>
              {propertyType === 'Single family' || propertyType === 'Mobile'
                ? `${propertyType} House`
                : propertyType}{' '}
              for {propertyFor}
            </div>
            {propertyFor === 'sale' ? (
              <div className="pty_price">{formatCurrency(price, currency)}</div>
            ) : (
              <div className="pty_price">
                {formatCurrency(price, currency)} <small>/ month</small>
              </div>
            )}
            <div className="pty_specs">
              <div className="pty_spec">
                <FaBed />
                <span className="spec">{bed}</span>
              </div>
              <div className="pty_spec">
                <FaBath />
                <span className="spec">{bath}</span>
              </div>
              <div className="pty_spec">
                <FaRulerCombined />
                <span className="spec">{sqft?.toLocaleString()} sqft</span>
              </div>
            </div>
            <div className="pty_box_btm">
              <div className="pty_location">
                <FaLocationDot />
                <div className="pty_loc_detail">
                  <small className="pty_street">{street}</small>
                  <div className="pty_state">
                    {city}, {state}
                  </div>
                </div>
              </div>
              {/* {property.owner !== userId && (
                <button className="contact_btn">
                  Contact{propertyFor === 'sale' ? ' Seller' : ' Manager'}
                </button>
              )} */}
            </div>
            <div className="pty_box_post_date">
              <MdOutlineBrowserUpdated />
              Posted{' '}
              {formatDistance(new Date(createdAt), new Date(), {
                addSuffix: true,
              })}
            </div>
          </div>
        </Link>
      </div>
    </article>
  );
};

export default PropertyCard;
