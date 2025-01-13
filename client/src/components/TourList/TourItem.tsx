import React from 'react';
import './TourList.css';
import { BsSmartwatch } from 'react-icons/bs';
import { FaHome } from 'react-icons/fa';
import { FaCalendarDays, FaLocationDot } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { TourItemProps } from '../../types/PropTypes';

const TourItem: React.FC<TourItemProps> = ({
  propertyId,
  addressOfTour,
  dateOfTour,
  timeOfTour,
  propertyImage,
}) => {
  return (
    <div className="tour_body">
      <Link to={`/property-detail/${propertyId}`} className="tour_img">
        <img src={propertyImage} alt={addressOfTour} />
      </Link>
      <div className="tour_info">
        <div className="tour_address">
          <FaLocationDot />
          <Link to={`/property-detail/${propertyId}`}>
            <FaHome />
            {addressOfTour}
          </Link>
        </div>
        <div className="tour_time">
          <div>
            <FaCalendarDays /> {dateOfTour}
          </div>
          <div>
            <BsSmartwatch />
            {timeOfTour}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourItem;
