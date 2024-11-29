import { useParams } from 'react-router-dom';
import { PROPERTIESDATA } from '../../propertiesData';
import { PropertyDataType } from '../../types';
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
import { useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { TbDimensions } from 'react-icons/tb';
const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const selectedProperty = PROPERTIESDATA.find(
    (property: PropertyDataType) => property.uniqueId === id
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);

  if (!selectedProperty) {
    return <p>Property not found.</p>;
  }
  const { street, city, state, price, bed, bath, sqft, photos } =
    selectedProperty;

  const openModal = (image: string) => {
    setModalImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
  };
  return (
    <div className="property_detail">
      <BackButton />
      <div className="pty_detail_hdr">
        <div className="pty_location">
          <FaLocationDot className="icon_location" />
          <div className="pty_loc_detail">
            <small className="pty_street">{street}</small>
            <div className="pty_state">
              {city}, {state}
            </div>
          </div>
        </div>
      </div>
      <div className="property_photos">
        <div className="main_photo">
          <span className="photo_info">front</span>
          <img
            src={
              photos.find((photo) => photo.title === 'front')?.image ||
              photos[0]?.image
            }
            alt="Front view"
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
        </div>

        <div className="small_photos">
          {photos
            .filter((photo) => photo.title !== 'front')
            .map((photo) => (
              <div
                key={photo.id}
                className="photo_box"
                onClick={() => openModal(photo.image)}
              >
                <span className="photo_info">{photo.title}</span>
                <img src={photo.image} alt={photo.title} />
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
            <div className="pty_price">${price.toLocaleString()}</div>
          </div>
          <div className="pty_info">
            <div className="info">
              <FaBed className="icon_info" />
              <span className="info_ttl">{bed}</span>
              {bed > 1 ? 'Beds' : 'Bed'}
            </div>
            <div className="info">
              <FaBath className="icon_info" />
              <span className="info_ttl">{bath}</span>
              Bath
            </div>
            <div className="info">
              <FaRulerCombined className="icon_info" />
              <span className="info_ttl">{sqft.toLocaleString()}</span>
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
            <div className="pty_type">
              <button>Ask a Question</button>
            </div>
            <div className="pty_type">
              <button>Schedule Tour</button>
            </div>
          </div>
        </div>
        <div className="pty_desc_second">
          <div className="pty_declars"></div>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal_content">
            <button className="close_button" onClick={closeModal}>
              <FaXmark />
            </button>
            <img
              src={modalImage!}
              alt="Enlarged view"
              className="modal_image"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;
