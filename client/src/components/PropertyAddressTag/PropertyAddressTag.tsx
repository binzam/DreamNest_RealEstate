import { FaLocationDot } from 'react-icons/fa6';
import './PropertyAddressTag.css';
interface PropertyAddressTagProps {
  city: string;
  street: string;
  state: string;
  className?: string;
}
const PropertyAddressTag = ({
  city,
  street,
  state,
  className = '',
}: PropertyAddressTagProps) => {
  return (
    <div className={`pty_location ${className}`}>
      <FaLocationDot />
      <div className="pty_loc_detail">
        <small className="pty_street">{street}</small>
        <div className="pty_state">
          {city}, {state}
        </div>
      </div>
    </div>
  );
};

export default PropertyAddressTag;
