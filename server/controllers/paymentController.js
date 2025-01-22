import stripe from 'stripe';
import { Transaction } from '../models/transactionModel.js';

const createPaymentIntent = async (req, res) => {
  const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);
  const { amount, currency, customerName, customerEmail, paymentReason } =
    req.body;
  console.log(amount, currency, customerName, customerEmail, paymentReason);

  try {
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: amount * 100,
      currency: currency,
      metadata: {
        customerName,
        paymentReason,
        customerEmail,
      },
    });
      const transaction = new Transaction({
        paymentIntentId: paymentIntent.id,
        amount: amount,
        currency: currency,
        customerName,
        customerEmail,
        paymentReason,
        status: 'succeeded', 
      });
      await transaction.save();
  
    console.log('PAYMENT INTENT-->', paymentIntent);
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
};

export { createPaymentIntent };
