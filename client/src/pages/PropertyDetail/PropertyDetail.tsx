import { useParams } from 'react-router-dom';
import './PropertyDetail.css';
import BackButton from '../../components/BackButton/BackButton';
import {
  FaBath,
  FaBed,
  FaHammer,
  FaLocationDot,
  FaRulerCombined,
} from 'react-icons/fa6';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import LocationIcon from '../../assets/location-icon.png';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { FaArrowCircleDown, FaHome } from 'react-icons/fa';
import { TbDimensions } from 'react-icons/tb';
import PropertySlider from '../../components/PropertySlider/PropertySlider';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchPropertyById } from '../../store/slices/propertySlice';
import ShareProperty from '../../components/ShareProperty/ShareProperty';
import ScheduleTourModal from '../../components/Modals/ScheduleTourModal/ScheduleTourModal';
import { formatDistance } from 'date-fns';
import { MdOutlineBrowserUpdated } from 'react-icons/md';
import { PropertyDataType } from '../../types/propertyTypes';
import { GridLoader } from 'react-spinners';
import ImagePreviewModal from '../../components/Modals/ImagePreviewModal/ImagePreviewModal';
import ContactModal from '../../components/Modals/ContactModal/ContactModal';
const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.user
  );
  const { propertiesById, loading } = useSelector(
    (state: RootState) => state.properties
  );
  const property = id ? propertiesById[id] : null;
  const [isImgModalOpen, setIsImgModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const customIcon = new Icon({
    iconUrl: LocationIcon,
    iconSize: [38, 38],
  });
  useEffect(() => {
    if (!property && id) {
      dispatch(fetchPropertyById(id));
    }
  }, [dispatch, id, property]);
  if (!loading && !property) {
    return <p>Property not found.</p>;
  }
  if (!property) {
    return null;
  }

  const {
    _id,
    address,
    price,
    bed,
    bath,
    yearBuilt,
    // title,
    sqft,
    photos = [],
    detail,
    propertyFor,
    propertyType,
    owner,
    createdAt,
  } = property as PropertyDataType;
  const { street, state, city, longitude, latitude } = address;
  const openModal = (image: string) => {
    setModalImage(image);
    setIsImgModalOpen(true);
    setIsImgModalOpen(true);
  };

  const closeModal = () => {
    setIsImgModalOpen(false);
    setIsImgModalOpen(false);
    setModalImage(null);
  };
  if (!property || loading) {
    return (
      <GridLoader
        color="#13ccbb"
        margin={10}
        size={25}
        className="listing_p_loading"
      />
    );
  }
  return (
    <div className="property_detail">
      <BackButton />
      <div className="pty_detail_hdr">
        <div className="pty_det_hdr_location">
          <FaLocationDot className="icon_location" />
          <div className="pty_hdr_loc_detail">
            <small className="pty_det_street">{street}</small>
            <div className="pty_det_state">
              {city}, {state}
            </div>
          </div>
        </div>
        {/* <div className="pty_titl">{title}</div> */}
        {isAuthenticated && user?._id === owner && (
          <div className="own_pty_tag">
            <FaArrowCircleDown />
            Your Property
          </div>
        )}
        <ShareProperty propertyId={_id} />
      </div>
      <div className="property_photos">
        <div className="main_photo">
          <span className="photo_info">front</span>
          {photos.length > 0 && (
            <img
              src={
                photos.find((photo) => photo.title === 'main')?.image ||
                photos[0].image
              }
              alt="Front view"
              loading="lazy"
              onClick={() => {
                const frontPhoto = photos.find(
                  (photo) => photo.title === 'main'
                );
                if (frontPhoto) {
                  openModal(frontPhoto.image);
                } else if (photos[0]) {
                  openModal(photos[0].image);
                }
              }}
            />
          )}
        </div>

        <div className="small_photos">
          {photos
            .filter((photo) => photo.title !== 'front')
            .map((photo, index) => (
              <div
                key={index}
                className="photo_box"
                onClick={() => openModal(photo.image)}
              >
                <span className="photo_info">{photo.title}</span>
                <img src={photo.image} alt={photo.title} loading="lazy" />
              </div>
            ))}
        </div>
      </div>
      <div className="property_descp">
        <div className="pty_post_date">
          <MdOutlineBrowserUpdated />
          Posted
          {formatDistance(new Date(createdAt), new Date(), {
            addSuffix: true,
          })}
        </div>

        <div className="pty_desc_main">
          <div className="pty_detail_price">
            <div className="pty_purpose">
              <span className="dot"></span>House for {propertyFor}
            </div>
            <div className="pty_price">${price?.toLocaleString()}</div>
          </div>
          <div className="pty_info">
            <div className="info">
              <FaBed className="icon_info" />
              <span className="info_ttl">{bed}</span>
              {bed && bed > 1 ? 'Beds' : 'Bed'}
            </div>
            <div className="info">
              <FaBath className="icon_info" />
              <span className="info_ttl">{bath}</span>
              Bath
            </div>
            <div className="info">
              <FaRulerCombined className="icon_info" />
              <span className="info_ttl">{sqft?.toLocaleString()}</span>
              sqft
            </div>
          </div>
          {isAuthenticated && user?._id !== owner && (
            <button
              className="pty_actn_btn"
              onClick={() => setIsScheduleModalOpen(true)}
            >
              Schedule Visit
            </button>
          )}
        </div>
        <div className="pty_desc_second">
          <div className="pty_declars">
            <div className="pty_type">
              <FaHome />
              <div className="pty_detail_col">
                <p>{propertyType}</p>
                <span>Property Type</span>
              </div>
            </div>
            <div className="pty_type">
              <FaHammer />
              <div className="pty_detail_col">
                <p>{yearBuilt}</p>
                <span>Year Built</span>
              </div>
            </div>
            {propertyFor === 'sale' && (
              <div className="pty_type">
                <TbDimensions />
                <div className="pty_detail_col">
                  <p>${(price / sqft).toFixed(1)}</p>
                  <span>Price per sqft</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="prty_desc_map">
          <div className="pty_desc_thrid">
            <div className="pty_detail">
              <div className="pty_detail_title">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M20 4a1 1 0 1 0-2 0v2.4L14.916 4a4.75 4.75 0 0 0-5.832 0L2.386 9.21a1 1 0 1 0 1.228 1.578l.386-.3V20a1 1 0 1 0 2 0V9c0-.022 0-.043-.002-.065l4.314-3.355a2.75 2.75 0 0 1 3.376 0l6.698 5.21a1 1 0 0 0 1.228-1.58L20 7.956V4Z"></path>
                  <path d="M13.707 11.293a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414 0l-1-1a1 1 0 1 1 1.414-1.414l.293.293 2.293-2.293a1 1 0 0 1 1.414 0Zm0 5a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414 0l-1-1a1 1 0 1 1 1.414-1.414l.293.293 2.293-2.293a1 1 0 0 1 1.414 0ZM15 14a1 1 0 0 1 1-1h5a1 1 0 1 1 0 2h-5a1 1 0 0 1-1-1Zm0 5a1 1 0 0 1 1-1h5a1 1 0 1 1 0 2h-5a1 1 0 0 1-1-1Z"></path>
                </svg>
                <h2>Property Detail </h2>
              </div>
              <p>{detail}</p>
            </div>
            {user?._id !== owner && (
              <div className="pty_actions">
                <button
                  className="pty_actn_btn"
                  onClick={() => setIsContactModalOpen(true)}
                >
                  Ask a Question
                </button>

                <button
                  className="pty_page_contact_btn"
                  onClick={() => setIsContactModalOpen(true)}
                >
                  Contact {propertyFor === 'rent' ? ' Owner' : ' Seller'}
                </button>
              </div>
            )}
          </div>
          <div className="pty_map">
            <MapContainer
              center={[latitude, longitude]}
              zoom={13}
              scrollWheelZoom={false}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker icon={customIcon} position={[latitude, longitude]}>
                <Popup>Property Location</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
      {isImgModalOpen && modalImage && (
        <ImagePreviewModal imageUrl={modalImage} onClose={closeModal} />
      )}
      {isScheduleModalOpen && (
        <ScheduleTourModal
          propertyImage={photos[0].image}
          propertyAddress={`${address.street} ${address.city}, ${address.state}`}
          propertyId={_id}
          onClose={() => setIsScheduleModalOpen(false)}
        />
      )}
      {isContactModalOpen && (
        <ContactModal
          propertyImage={photos[0].image}
          propertyAddress={`${address.street} ${address.city}, ${address.state}`}
          onClose={() => setIsContactModalOpen(false)}
        />
      )}
      <PropertySlider
        title={`Similar Listings for ${propertyFor}`}
        propertyFor={propertyFor}
      />
    </div>
  );
};

export default PropertyDetail;
