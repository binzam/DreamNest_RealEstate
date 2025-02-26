import { useLocation, useNavigate } from 'react-router-dom';
import './TourScheduleCheckout.css';
import TourItem from '../../components/TourList/TourItem';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripeCheckout from '../../components/StripeCheckout/StripeCheckout';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '../../context/useUser';
import Container from '../../components/Container/Container';

const TourScheduleCheckout = () => {
  const { state } = useUser();
  const { user } = state;
  const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_KEY}`);
  const navigate = useNavigate();
  const location = useLocation();
  const tempTourId = uuidv4();
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
      <Container>
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
                state: { message: "You have scheduled a tour of the property." },
                replace: true,
              })
            }
            customerName={user?.firstName || ''}
            paymentReason="Tour scheduling Fee"
            customerEmail={user?.email || ''}
            paymentAmount="20"
            tempTourId={tempTourId}
          />
        </Elements>
      </Container>
    </div>
  );
};

export default TourScheduleCheckout;
