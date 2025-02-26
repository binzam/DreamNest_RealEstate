import { FaBath, FaBed, FaRulerCombined } from 'react-icons/fa6';
import './PropertyCard.css';
import PriceDisplay from '../PriceDisplay/PriceDisplay';
import PropertyAddressTag from '../PropertyAddressTag/PropertyAddressTag';
import { IoMdInformationCircleOutline } from 'react-icons/io';
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
  isAvailable?: boolean;
}

const PropertyCardBody = ({
  propertyFor,
  isAvailable,
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
        <span
          className={`dot ${
            isAvailable && isAvailable === true ? '' : 'dot red'
          }`}
        ></span>
        {propertyType === 'Single family' || propertyType === 'Mobile'
          ? `${propertyType} House`
          : propertyType}{' '}
        for {propertyFor}
      </div>
      {isAvailable !== undefined && isAvailable === false && (
        <p className="red_txt">  <IoMdInformationCircleOutline />Not Available</p>
      )}
      <PriceDisplay
        amount={price}
        currency={currency}
        propertyFor={propertyFor}
        className="sml"
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
        <PropertyAddressTag city={city} street={street} state={state} />
      </div>
    </div>
  );
};

export default PropertyCardBody;
