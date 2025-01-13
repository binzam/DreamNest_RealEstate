import stripe from 'stripe';


const createPaymentIntent = async (req, res) => {
    const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);
  const { amount, currency } = req.body;
    console.log(amount, currency );
    
  try {
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: amount * 100,
      currency: currency,
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
};

export { createPaymentIntent };
