import stripe from 'stripe';
import { Transaction } from '../models/transactionModel.js';

const createPaymentIntent = async (req, res) => {
  const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);
  const {
    amount,
    currency,
    customerName,
    customerEmail,
    paymentReason,
    tempPropertyId,
    tempTourId,
  } = req.body;
  console.log(amount, currency, customerName, customerEmail, paymentReason);

  try {
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: amount * 100,
      currency: currency,
      metadata: {
        customerName,
        paymentReason,
        customerEmail,
        tempPropertyId,
        tempTourId, 
      },
    });
    const transaction = new Transaction({
      paymentIntentId: paymentIntent.id,
      amount: amount,
      currency: currency,
      customerName,
      customerId: req.user._id,
      customerEmail,
      paymentReason,
      tempPropertyId,
      tempTourId, 
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

// const updateTransaction = async (req, res) => {
//   const { tempPropertyId, propertyId } = req.body;

//   try {
//     const transaction = await Transaction.findOneAndUpdate(
//       { tempPropertyId },
//       { propertyId },
//       { new: true }
//     );

//     if (!transaction) {
//       return res.status(404).json({ error: 'Transaction not found' });
//     }

//     res
//       .status(200)
//       .json({ message: 'Transaction updated successfully', transaction });
//   } catch (error) {
//     console.error('Error updating transaction:', error);
//     res.status(500).json({ error: 'Failed to update transaction' });
//   }
// };
export { createPaymentIntent };
