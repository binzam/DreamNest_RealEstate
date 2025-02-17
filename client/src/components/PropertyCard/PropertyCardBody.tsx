import { FaBath, FaBed, FaLocationDot, FaRulerCombined } from 'react-icons/fa6';
import './PropertyCard.css';
import PriceDisplay from '../PriceDisplay/PriceDisplay';
interface PropertyCardBodyProps {
  propertyFor: string;
  propertyType: string;
  bed: number;
  bath: number;
  sqft: number;
  price: number;
  currency: string;
  city: string;
  street: string;
  state: string;
  className: string;
}

const PropertyCardBody = ({
  propertyFor,
  propertyType,
  bed,
  bath,
  sqft,
  price,
  currency,
  city,
  street,
  state,
  className,
}: PropertyCardBodyProps) => {
  return (
    <div className={className}>
      <div className="pty_purpose">
        <span className="dot"></span>
        {propertyType === 'Single family' || propertyType === 'Mobile'
          ? `${propertyType} House`
          : propertyType}{' '}
        for {propertyFor}
      </div>
     
      <PriceDisplay
        amount={price}
        currency={currency}
        propertyFor={propertyFor}
        className='sml'
      />
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
      </div>
    </div>
  );
};

export default PropertyCardBody;
