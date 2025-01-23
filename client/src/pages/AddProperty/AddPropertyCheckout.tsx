import { Elements } from '@stripe/react-stripe-js';
import { PropertyFormData } from '../../types/propertyTypes';
import PropertyCardBody from '../../components/PropertyCard/PropertyCardBody';
import MapDisplay from '../../components/MapDisplay/MapDisplay';
import StripeCheckout from '../../components/StripeCheckout/StripeCheckout';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { stripePromise } from '../../constants';
import { v4 as uuidv4 } from 'uuid';
interface AddPropertyCheckoutProps {
  formData: PropertyFormData;
  onPaymentSuccess: () => void;
}
const AddPropertyCheckout: React.FC<AddPropertyCheckoutProps> = ({
  formData,
  onPaymentSuccess,
}) => {
  const { user } = useSelector((state: RootState) => state.user);
  const tempPropertyId = uuidv4();
  formData.tempPropertyId = tempPropertyId;
  const {
    propertyFor,
    price,
    bed,
    bath,
    sqft,
    address,
    propertyType,
    currency,
  } = formData;
  const { city, street, state, latitude, longitude } = address;
  return (
    <fieldset>
      <legend>Listing Payment</legend>
      <div className="listing_payment">
        <h2>Confirm Listing</h2>
        <div className="add_pty_payment_cntnt">
          <article className="new_lsting_box">
            <MapDisplay
              longitude={longitude}
              latitude={latitude}
              mapSize="sml"
            />

            <div className="new_pty_imgs">
              {formData.photos.map((photo, index) => (
                <img key={index} src={photo.previewUrl} alt={photo.title} />
              ))}
            </div>
            <PropertyCardBody
              propertyFor={propertyFor}
              propertyType={propertyType}
              bed={bed}
              bath={bath}
              sqft={sqft}
              price={price}
              currency={currency}
              city={city}
              street={street}
              state={state}
              className="new_pty"
            />
          </article>
        </div>
        <Elements stripe={stripePromise}>
          <StripeCheckout
            onSuccess={onPaymentSuccess}
            customerName={user?.firstName || ''}
            paymentReason="Property Listing Fee"
            customerEmail={user?.email || ''}
            paymentAmount="45"
            tempPropertyId={tempPropertyId}
          />
        </Elements>
      </div>
    </fieldset>
  );
};

export default AddPropertyCheckout;
