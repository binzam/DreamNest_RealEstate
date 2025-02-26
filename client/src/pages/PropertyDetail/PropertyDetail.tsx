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
import { useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { TbDimensions } from 'react-icons/tb';
import PropertySlider from '../../components/PropertySlider/PropertySlider';
import ShareProperty from '../../components/ShareProperty/ShareProperty';
import ScheduleTourModal from '../../components/Modals/ScheduleTourModal/ScheduleTourModal';
import ImagePreviewModal from '../../components/Modals/ImagePreviewModal/ImagePreviewModal';
import ContactModal from '../../components/Modals/ContactModal/ContactModal';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { SiGooglemaps } from 'react-icons/si';
import MapDisplay from '../../components/MapDisplay/MapDisplay';
import PriceDisplay from '../../components/PriceDisplay/PriceDisplay';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import { useQuery } from '@tanstack/react-query';
import { Loader } from '../../components/Loader';
import ErrorDisplay from '../../components/ErrorDisplay/ErrorDisplay';
import { fetchConversionRate } from '../../api/currency';
import { useFetchPropertyById } from '../../hooks/useProperties';
import OwnerTag from '../../components/OwnerTag/OwnerTag';
import { useUser } from '../../context/useUser';
import Container from '../../components/Container/Container';
import FormattedDate from '../../components/FormattedDate/FormattedDate';
import BackToTopButton from '../../components/BackToTopButton/BackToTopButton';
const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { state } = useUser();
  const { user, isAuthenticated } = state;
  const isAdmin = user?.role === 'admin';
  const {
    data: property,
    isLoading: isPropertyLoading,
    isError,
    error,
  } = useFetchPropertyById(id!);

  const [isImgModalOpen, setIsImgModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [modalImageTitle, setModalImageTitle] = useState<string | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const currencyOptions = ['USD', 'EUR', 'GBP', 'AUD', 'CAD', 'JPY'];

  const { data: conversionRate, isLoading: isRateLoading } = useQuery({
    queryKey: ['conversionRate', property?.currency, selectedCurrency],
    queryFn: () => fetchConversionRate(property!.currency, selectedCurrency),
    enabled: !!property,
    staleTime: 1000 * 60 * 5,
  });
  if (isPropertyLoading) {
    return <Loader />;
  }
  if (isError) {
    return <ErrorDisplay message={error.message} />;
  }
  if (!property) {
    return <div>No property found.</div>;
  }

  const {
    _id,
    address,
    price,
    bed,
    bath,
    yearBuilt,
    currency,
    propertyType,
    // title,
    sqft,
    photos = [],
    detail,
    propertyFor,
    isAvailable,
    owner,
    sizeUnit,
    createdAt,
  } = property;
  console.log(property);

  const { street, state: addressState, city, longitude, latitude } = address;
  const isOwner = user?._id === owner;

  const openModal = (image: string, title: string) => {
    setModalImage(image);
    setModalImageTitle(title);
    setIsImgModalOpen(true);
    setIsImgModalOpen(true);
  };

  const closeModal = () => {
    setIsImgModalOpen(false);
    setIsImgModalOpen(false);
    setModalImage(null);
    setModalImageTitle(null);
  };

  const convertedPrice = property.price * (conversionRate || 1);
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(e.target.value);
  };

  const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

  return (
    <>
      {isAdmin && <AdminHeader />}
      <div className="property_detail">
        <Container>
          <div className="pty_detail_hdr">
            <BackButton className="black" />
            <div className="pty_det_hdr_location">
              <FaLocationDot className="pty_det_icon_location" />
              <div className="pty_hdr_loc_detail">
                <small className="pty_det_street">{street}</small>
                <div className="pty_det_state">
                  {city}, {addressState}
                </div>
              </div>
            </div>
            {/* <div className="pty_titl">{title}</div> */}
            {!isAdmin && isOwner && (
              <OwnerTag label="Your Property" className="top_left" />
            )}
            {isAdmin && owner && (
              <OwnerTag
                className="top_left"
                isAdmin={true}
                userId={owner.toString()}
              />
            )}
            <ShareProperty propertyId={_id} />
          </div>
        </Container>

        <div className="property_photos">
          <div className="property_photos_inner">
            <div className="main_photo">
              <span className="photo_info">Main</span>
              {photos.length > 0 && (
                <img
                  src={photos[0].image}
                  alt="Front view"
                  loading="lazy"
                  onClick={() => {
                    const frontPhoto = photos.find(
                      (photo) => photo.title === 'main'
                    );
                    if (frontPhoto) {
                      openModal(frontPhoto.image, frontPhoto.title);
                    } else if (photos[0]) {
                      openModal(photos[0].image, photos[0].title);
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
                    onClick={() => openModal(photo.image, photo.title)}
                  >
                    <span className="photo_info">{photo.title}</span>
                    <img src={photo.image} alt={photo.title} loading="lazy" />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <Container>
          <div className="property_descp">
            <FormattedDate
              date={createdAt}
              showIcon
              prefix="Posted"
              className="pty_det_post_date"
            />
            {!isOwner && isAuthenticated && (
              <button
                className="pty_visit_btn"
                onClick={() => setIsScheduleModalOpen(true)}
              >
                <p>Do you want to Visit this Property?</p>
                <span>
                  <IoMdInformationCircleOutline />
                  Click to schedule a tour.
                </span>
              </button>
            )}

            <div className="pty_desc_main">
              <div className="pty_detail_price">
                <div className="pty_det_price_wrap">
                  <div className="pty_purpose">
                    <span
                      className={`dot ${
                        isAvailable && isAvailable === true ? '' : 'dot red'
                      }`}
                    ></span>
                    {propertyType === 'Single family' ||
                    propertyType === 'Mobile'
                      ? `${propertyType} House`
                      : propertyType}{' '}
                    for {propertyFor}
                  </div>
                  {isAvailable !== undefined && isAvailable === false && (
                    <p className="red_txt_dt">
                      {' '}
                      <IoMdInformationCircleOutline />
                      Not Available
                    </p>
                  )}

                  <PriceDisplay
                    amount={price}
                    currency={currency}
                    isLoading={isRateLoading}
                    convertedAmount={convertedPrice}
                    selectedCurrency={selectedCurrency}
                    propertyFor={propertyFor}
                    className="lrg"
                  />
                </div>
                <div className="currency_selector">
                  <label htmlFor="currency">
                    <span>Change</span> <br /> currency?
                  </label>
                  <select
                    className="currency_opts"
                    id="currency"
                    value={selectedCurrency}
                    onChange={handleCurrencyChange}
                  >
                    {currencyOptions.map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </select>
                </div>
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
                  {sizeUnit}
                </div>
              </div>
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
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path d="M20 4a1 1 0 1 0-2 0v2.4L14.916 4a4.75 4.75 0 0 0-5.832 0L2.386 9.21a1 1 0 1 0 1.228 1.578l.386-.3V20a1 1 0 1 0 2 0V9c0-.022 0-.043-.002-.065l4.314-3.355a2.75 2.75 0 0 1 3.376 0l6.698 5.21a1 1 0 0 0 1.228-1.58L20 7.956V4Z"></path>
                      <path d="M13.707 11.293a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414 0l-1-1a1 1 0 1 1 1.414-1.414l.293.293 2.293-2.293a1 1 0 0 1 1.414 0Zm0 5a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414 0l-1-1a1 1 0 1 1 1.414-1.414l.293.293 2.293-2.293a1 1 0 0 1 1.414 0ZM15 14a1 1 0 0 1 1-1h5a1 1 0 1 1 0 2h-5a1 1 0 0 1-1-1Zm0 5a1 1 0 0 1 1-1h5a1 1 0 1 1 0 2h-5a1 1 0 0 1-1-1Z"></path>
                    </svg>
                    <h2>Property Detail </h2>
                  </div>
                  <p>{detail}</p>
                </div>
                {!isOwner && (
                  <div className="pty_actions">
                    <button
                      className="pty_ask_btn"
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
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="location_link"
                >
                  <SiGooglemaps /> View on Google Maps
                </a>
                <MapDisplay
                  longitude={longitude}
                  latitude={latitude}
                  mapSize="lrg"
                />
              </div>
            </div>
          </div>
        </Container>

        {isImgModalOpen && modalImage && (
          <ImagePreviewModal
            imageUrl={modalImage}
            onClose={closeModal}
            imageTitle={modalImageTitle}
          />
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
        <BackToTopButton />
      </div>
    </>
  );
};

export default PropertyDetail;
