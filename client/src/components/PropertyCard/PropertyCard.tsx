import {
  FaBath,
  FaBed,
  FaHeart,
  FaLocationDot,
  FaRulerCombined,
} from 'react-icons/fa6';
import { PropertyDataType } from '../../types';
import './PropertyCard.css';
import { Link } from 'react-router-dom';

const PropertyCard = ({ data }: { data: PropertyDataType }) => {
  return (
    <article className="pty_box">
      <button className="wish_btn">
        <FaHeart className="icon_heart" />
      </button>
      <Link to={`/property-detail/${data.uniqueId}`}>
        <div className="pty_img">
          <img width={400} height={250} src={data.image} alt="" loading="lazy" />
        </div>
      </Link>
      <div>
        <Link to={`/property-detail/${data.uniqueId}`}>
          <div className="pty_box_body">
            <div className="pty_purpose">
              <span className="dot"></span>Listing for {data.propertyFor}
            </div>
            <div className="pty_price">${data.price.toLocaleString()}</div>
            <div className="pty_specs">
              <div className="pty_spec">
                <FaBed />
                <span className="spec">{data.bed}</span>
              </div>
              <div className="pty_spec">
                <FaBath />
                <span className="spec">{data.bath}</span>
              </div>
              <div className="pty_spec">
                <FaRulerCombined />
                <span className="spec">{data.sqft.toLocaleString()} sqft</span>
              </div>
            </div>
            <div className="pty_box_btm">
              <div className="pty_location">
                <FaLocationDot />
                <div className="pty_loc_detail">
                  <small className="pty_street">{data.street}</small>
                  <div className="pty_state">
                    {data.city}, {data.state}
                  </div>
                </div>
              </div>
              <button className="contact_btn">Contact Seller</button>
            </div>
          </div>
        </Link>
      </div>
    </article>
  );
};

export default PropertyCard;
