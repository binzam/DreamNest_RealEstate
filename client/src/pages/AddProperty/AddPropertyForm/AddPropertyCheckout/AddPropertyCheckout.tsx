import { Elements } from '@stripe/react-stripe-js';
import { PropertyFormData } from '../../../../types/propertyTypes';
import PropertyCardBody from '../../../../components/PropertyCard/PropertyCardBody';
import MapDisplay from '../../../../components/MapDisplay/MapDisplay';
import StripeCheckout from '../../../../components/StripeCheckout/StripeCheckout';
import { stripePromise } from '../../../../constants';
import { useState } from 'react';
import { useUser } from '../../../../context/useUser';
import './AddPropertyCheckout.css'
interface AddPropertyCheckoutProps {
  formData: PropertyFormData;
  onPaymentSuccess: () => void;
}
const AddPropertyCheckout: React.FC<AddPropertyCheckoutProps> = ({
  formData,
  onPaymentSuccess,
}) => {
  const { state } = useUser();
  const { user } = state;
  const [paymentTier, setpaymentTier] = useState<'standard' | 'featured'>(
    'standard'
  );

  const paymentTierPrices = {
    standard: 45,
    featured: 75,
  };

  const handleTierChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setpaymentTier(e.target.value as 'standard' | 'featured');
  };
  const {
    propertyFor,
    price,
    bed,
    bath,
    sqft,
    address,
    propertyType,
    isAvailable,
    currency,
  } = formData;
  const { city, street, state: addressState, latitude, longitude } = address;
  return (
    <fieldset>
      <legend className='field_title'>Listing Payment</legend>
      <div className="listing_payment">
        <h2>Confirm Listing</h2>
        <div className="add_pty_payment_cntnt">
          <article className="new_lsting_box">
            <div className="new_pty_imgs">
              {formData.photos.map((photo, index) => (
                <img key={index} src={photo.previewUrl} alt={photo.title} />
              ))}
            </div>
            <PropertyCardBody
              propertyFor={propertyFor}
              propertyType={propertyType}
              bed={Number(bed)}
              bath={Number(bath)}
              sqft={Number(sqft)}
              price={Number(price)}
              currency={currency}
              city={city}
              street={street}
              state={addressState}
              isAvailable={isAvailable}
              className="new_pty"
            />
            <MapDisplay
              longitude={longitude}
              latitude={latitude}
              mapSize="sml sml-screen_full"
            />

          </article>
        </div>
        <div className="tier_selection">
          <label htmlFor="paymentTier">Choose property listing Tier</label>
          <select
            className="tier_select"
            id="paymentTier"
            value={paymentTier}
            onChange={handleTierChange}
          >
            <option value="standard">Standard ($45) - Regular</option>
            <option value="featured">Featured ($75) - More visibility</option>
          </select>
        </div>

        <Elements stripe={stripePromise}>
          <StripeCheckout
            onSuccess={onPaymentSuccess}
            customerName={user?.firstName || ''}
            paymentReason="Property Listing Fee"
            customerEmail={user?.email || ''}
            paymentAmount={paymentTierPrices[paymentTier].toString()}
            tempPropertyId={formData.tempPropertyId}
            paymentTier={paymentTier}
          />
        </Elements>
      </div>
    </fieldset>
  );
};

export default AddPropertyCheckout;
