import { useParams } from 'react-router-dom';
import './PropertyDetail.css';
import BackButton from '../../components/BackButton/BackButton';
import {
  FaBath,
  FaBed,
  FaHammer,
  FaLocationDot,
  FaRulerCombined,
  FaXmark,
} from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { TbDimensions } from 'react-icons/tb';
import PropertySlider from '../../components/PropertySlider/PropertySlider';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchPropertyById } from '../../store/slices/propertySlice';
import ShareProperty from '../../components/ShareProperty/ShareProperty';
import ScheduleTourModal from '../../components/ScheduleTourModal/ScheduleTourModal';
const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  const property = useSelector((state: RootState) =>
    id ? state.properties.propertiesById[id] : null
  );
  const [isImgModalOpen, setIsImgModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);

  useEffect(() => {
    if (!property && id) {
      dispatch(fetchPropertyById(id));
    }
  }, [dispatch, id, property]);
  if (!property) {
    return <p>Property not found.</p>;
  }
  const {
    address ,
    price,
    bed,
    bath,
    sqft,
    photos = [],
    detail,
    category,
  } = property;
  const { street, state, city,  } = address;
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
        <button className="pty_page_contact_btn">Contact Seller</button>
        <ShareProperty propertyId={property._id} />
      </div>
      <div className="property_photos">
        <div className="main_photo">
          <span className="photo_info">front</span>
          {photos.length > 0 && (
            <img
              src={
                // photos.find((photo) => photo.title === 'front')?.image ||
                photos[0].image
              }
              alt="Front view"
              loading="lazy"
              onClick={() => {
                const frontPhoto = photos.find(
                  (photo) => photo.title === 'front'
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
        <div className="pty_desc_main">
          <div className="pty_detail_price">
            <div className="pty_purpose">
              <span className="dot"></span>House for Sell
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
        </div>
        <div className="pty_desc_second">
          <div className="pty_declars">
            <div className="pty_type">
              <FaHome />
              <div className="pty_detail_col">
                <p>Single Family</p>
                <span>Property Type</span>
              </div>
            </div>
            <div className="pty_type">
              <FaHammer />
              <div className="pty_detail_col">
                <p>1954</p>
                <span>Year Built</span>
              </div>
            </div>
            <div className="pty_type">
              <TbDimensions />
              <div className="pty_detail_col">
                <p>$174</p>
                <span>Price per sqft</span>
              </div>
            </div>
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
            <div className="pty_actions">
              <button className="pty_actn_btn">Ask a Question</button>
              {isAuthenticated && (
                <button
                  className="pty_actn_btn"
                  onClick={() => setIsScheduleModalOpen(true)}
                >
                  Schedule Tour
                </button>
              )}
            </div>
          </div>
          <div className="pty_map">
            <div className="pty_map_hdr">
              <FaLocationDot className="icon_location" /> View on Google Maps
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3316.6708991587166!2d-84.41467560446833!3d33.76916922076559!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f50499b8d2e28b%3A0x6b3ebde7a1b735b0!2s534%20English%20Ave%20NW%2C%20Atlanta%2C%20GA%2030318%2C%20USA!5e0!3m2!1sen!2set!4v1733268745109!5m2!1sen!2set"
              width="300"
              height="225"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      {isImgModalOpen && modalImage && (
        <div className="pty_img_modal">
          <div className="pty_img_modal_content">
            <button className="close_button" onClick={closeModal}>
              <FaXmark />
            </button>
            <img
              src={modalImage!}
              alt="Enlarged view"
              className="modal_image"
              loading="lazy"
            />
          </div>
        </div>
      )}
      {isScheduleModalOpen && (
        <ScheduleTourModal
          propertyId={property._id}
          onClose={() => setIsScheduleModalOpen(false)}
        />
      )}
      <PropertySlider title="Similar Homes" propertyCategory={category} />
    </div>
  );
};

export default PropertyDetail;
