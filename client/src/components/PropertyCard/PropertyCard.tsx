import { FaDeleteLeft, FaHeart } from 'react-icons/fa6';
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
import { FaEdit } from 'react-icons/fa';
import PropertyCardBody from './PropertyCardBody';
import FormattedDate from '../FormattedDate/FormattedDate';
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
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.user
  );
  const userId = useSelector((state: RootState) => state.user.user?._id);
  const isAdminMode = user?.role === 'admin';

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
      {!isAdminMode && property.owner !== userId && (
        <button
          className={isInWishlist ? 'wish_btn filled' : 'wish_btn'}
          onClick={isInWishlist ? handleRemoveFromWish : handleAddToWish}
        >
          <FaHeart
            className={isInWishlist ? 'icon_heart filled' : 'icon_heart'}
          />
        </button>
      )}
      {(isAdminMode || property.owner === userId) && (onEdit || onDelete) && (
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
            <PropertyCardBody
              propertyFor={propertyFor}
              propertyType={propertyType}
              bed={bed}
              bath={bath}
              sqft={sqft}
              price={price}
              currency={currency}
              city={city}
              street={street}
              state={state}
              className=""
            />

            <FormattedDate
              date={createdAt}
              prefix="Posted"
              showIcon={true}
              className="pty_box_post_date"
            />
          </div>
        </Link>
      </div>
    </article>
  );
};

export default PropertyCard;
