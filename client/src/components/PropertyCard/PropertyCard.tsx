import { FaDeleteLeft, FaHeart } from 'react-icons/fa6';
import { PropertyDataType } from '../../types/propertyTypes';
import './PropertyCard.css';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { GridLoader } from 'react-spinners';
import { FaEdit } from 'react-icons/fa';
import PropertyCardBody from './PropertyCardBody';
import FormattedDate from '../FormattedDate/FormattedDate';
import {
  useAddToWishlist,
  useFetchWishlist,
  useRemoveFromWishlist,
} from '../../hooks/useWishlist';
import { Loader } from '../Loader';
import OwnerTag from '../OwnerTag/OwnerTag';
import { useUser } from '../../context/useUser';
interface PropertyCardProps {
  property: PropertyDataType;
  onEdit?: (id: string, ownerId: string) => void;
  onDelete?: (id: string, imageUrl: string) => void;
  adminMode?: boolean;
}
const PropertyCard = React.memo(
  ({ property, onEdit, onDelete, adminMode = false }: PropertyCardProps) => {
    const { state: userState } = useUser();
    const { user, isAuthenticated } = userState;
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
      priority,
      isAvailable,
      owner,
    } = property;
    const { city, street, state: addressState } = address;
    const isOwner = user?._id === owner;
    const navigate = useNavigate();
    const { data: wishlist = [] } = useFetchWishlist(isAuthenticated);
    const [loadingProperty, setLoadingProperty] = useState<string | null>(null);
    const [localIsInWishlist, setLocalIsInWishlist] = useState(false);
    const { mutate: addToWishlist } = useAddToWishlist();
    const { mutate: removeFromWishlist } = useRemoveFromWishlist();

    useEffect(() => {
      if (!isAuthenticated) {
        setLocalIsInWishlist(false);
      } else if (wishlist && isAuthenticated) {
        setLocalIsInWishlist(
          wishlist.some((wishlistItem) => wishlistItem._id === _id)
        );
      }
    }, [wishlist, _id, isAuthenticated]);

    const handleAddToWish = () => {
      if (!isAuthenticated) {
        navigate('/login');
        return;
      }
      setLoadingProperty(_id);
      setLocalIsInWishlist(true);
      addToWishlist(_id, {
        onSettled: () => setLoadingProperty(null),
      });
    };
    const handleRemoveFromWish = () => {
      if (!isAuthenticated) {
        navigate('/login');
        return;
      }
      setLoadingProperty(_id);
      setLocalIsInWishlist(false);
      removeFromWishlist(_id, {
        onSettled: () => setLoadingProperty(null),
      });
    };
    if (!property) {
      return <Loader />;
    }

    return (
      <article
        className={`pty_box ${
          localIsInWishlist && priority === 'featured'
            ? 'wishlisted featured'
            : localIsInWishlist
            ? 'wishlisted'
            : priority === 'featured'
            ? 'featured'
            : ''
        }`}
      >
        {loadingProperty === _id && (
          <GridLoader
            color="#f38b8b"
            margin={50}
            size={25}
            className="pty_box_loading"
          />
        )}
        {!adminMode && (!isOwner || !owner) && (
          <button
            className={localIsInWishlist ? 'wish_btn filled' : 'wish_btn'}
            onClick={localIsInWishlist ? handleRemoveFromWish : handleAddToWish}
            disabled={loadingProperty === _id}
            aria-label={
              localIsInWishlist ? 'Remove from wishlist' : 'Add to wishlist'
            }
          >
            <FaHeart
              className={localIsInWishlist ? 'icon_heart filled' : 'icon_heart'}
            />
          </button>
        )}
        {isAuthenticated && isOwner && (
          <OwnerTag label="Your Property" className="card" />
        )}
        {isAuthenticated && (adminMode || isOwner) && (onEdit || onDelete) && (
          <div className="owner_actions">
            {onEdit && (
              <button
                className="edit_btn"
                onClick={() => onEdit(_id, owner as string)}
              >
                <FaEdit />
                Edit
              </button>
            )}
            {onDelete && (
              <button
                className="del_btn"
                onClick={() => onDelete(_id, photos[0].image)}
              >
                <FaDeleteLeft />
                Delete
              </button>
            )}
          </div>
        )}
        {priority && priority === 'featured' && (
          <span className="featured_pty">Featured</span>
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
                isAvailable={isAvailable}
                sqft={sqft}
                price={price}
                currency={currency}
                city={city}
                street={street}
                state={addressState}
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
  }
);
export default PropertyCard;
