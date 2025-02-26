import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { axiosPrivate } from '../../api/axiosInstance';
import { MdPayments } from 'react-icons/md';
import './StripeCheckout.css';
import ErrorDisplay from '../ErrorDisplay/ErrorDisplay';
import { BeatLoader } from 'react-spinners';
import { IoMdInformationCircleOutline } from 'react-icons/io';
interface StripeCheckoutProps {
  propertyId?: string;
  tourDateTime?: string;
  onSuccess: () => void;
  customerName: string;
  paymentReason: string;
  customerEmail: string;
  paymentAmount: string;
  tempPropertyId?: string;
  tempTourId?: string;
  paymentTier?: 'standard' | 'featured';
}

const StripeCheckout = ({
  propertyId,
  tourDateTime,
  onSuccess,
  customerName,
  paymentReason,
  customerEmail,
  paymentAmount,
  tempPropertyId,
  tempTourId,
  paymentTier,
}: StripeCheckoutProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    try {
      const { data } = await axiosPrivate.post(
        '/payment/create-payment-intent',
        {
          amount: paymentAmount,
          currency: 'usd',
          customerName,
          paymentReason,
          customerEmail,
          tempPropertyId,
          tempTourId,
          paymentTier,
        }
      );

      const clientSecret = data.clientSecret;
      const cardElement = elements.getElement(CardElement);

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement!,
        },
      });

      if (error) {
        console.error('Payment error:', error);
        setError('Payment failed. Please try again.');
        setLoading(false);
        return;
      }
      if (Number(paymentAmount) === 20 && tempTourId) {
        await axiosPrivate.post('/tour/schedule-tour', {
          propertyId,
          tourDateTime,
          tempTourId,
        });
      }
      onSuccess();
    } catch (err) {
      console.error(err);
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card_input">
      <div className="fee_msg">
        <span className="fee_amount">${paymentAmount}</span>
        <IoMdInformationCircleOutline /> {paymentReason}
      </div>
      {error && <ErrorDisplay message={error} />}
      <CardElement
        options={{
          style: {
            base: {
              backgroundColor: '#fff',
              fontWeight: '500',
              fontSize: '20px',
              fontSmoothing: 'antialiased',
              ':-webkit-autofill': {
                color: '#fce883',
              },
              '::placeholder': {
                color: '#87BBFD',
                fontSize: '12px',
              },
            },
            invalid: { color: '#fa755a' },
          },
        }}
      />
      <button
        onClick={handlePayment}
        disabled={loading}
        className="payment_btn"
      >
        <MdPayments />
        {loading ? 'Processing...' : 'Pay & Confirm'}
      </button>

      {loading && (
        <BeatLoader
          color="#008000"
          margin={10}
          size={25}
          className="checkout_loading"
        />
      )}
    </div>
  );
};

export default StripeCheckout;
