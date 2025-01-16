import { useLocation, useNavigate } from 'react-router-dom';
import './TourScheduleCheckout.css';
import TourItem from '../../components/TourList/TourItem';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripeCheckout from '../../components/StripeCheckout/StripeCheckout';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const TourScheduleCheckout = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_KEY}`);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    propertyId,
    tourDateTime,
    propertyAddress,
    propertyImage,
    formattedDate,
    formattedTime,
  } = location.state || {};

  return (
    <div className="tour_payment_page">
      <h2>Confirm tour request</h2>
      <TourItem
        propertyId={propertyId}
        addressOfTour={propertyAddress}
        dateOfTour={formattedDate}
        timeOfTour={formattedTime}
        propertyImage={propertyImage}
      />
     
      <Elements stripe={stripePromise}>
        <StripeCheckout
          propertyId={propertyId}
          tourDateTime={tourDateTime}
          onSuccess={() =>
            navigate('/tour-schedules', {
              state: { success: true },
              replace: true,
            })
          }
          customerName={user?.firstName || ''}
          paymentReason="Tour scheduling Fee"
          customerEmail={user?.email || ''}
          paymentAmount='20'
        />
      </Elements>
      
    </div>
  );
};

export default TourScheduleCheckout;
