import { useLocation, useNavigate } from 'react-router-dom';
import './TourScheduleCheckout.css';
import { useState } from 'react';
import { axiosPrivate } from '../../api/axiosInstance';
import TourItem from '../../components/TourList/TourItem';
import { MdPayments } from 'react-icons/md';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const TourScheduleCheckout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
  const handlePayment = async () => {
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    try {
      const { data } = await axiosPrivate.post(
        '/payment/create-payment-intent',
        {
          amount: 20, 
          currency: 'usd',
        }
      );
      console.log(data)
      const clientSecret = data.clientSecret;

      const cardElement = elements.getElement(CardElement);

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      if (error) {
        console.error('Payment error:', error);
        setError('Payment failed. Please try again.');
        setLoading(false);
        return;
      }

      await axiosPrivate.post('/tour/schedule-tour', {
        propertyId,
        tourDateTime,
      });

      navigate('/tour-schedules', { state: { success: true } });
    } catch (err) {
      console.error(err);
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
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
      <div className="fee_msg">
        <span className="fee_amount">$20</span>
        <IoMdInformationCircleOutline /> Tour scheduling Fee{' '}
      </div>

      {error && <div className="payment_error">{error}</div>}
      <div className="card_input">
        <CardElement />
      </div>

      <button
        onClick={handlePayment}
        disabled={loading}
        className="payment_btn"
      >
        <MdPayments />
        {loading ? 'Processing...' : 'Pay & Confirm'}
      </button>
    </div>
  );
};

export default TourScheduleCheckout;
