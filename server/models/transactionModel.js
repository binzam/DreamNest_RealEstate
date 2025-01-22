import { Schema, model } from 'mongoose';

const transactionSchema = new Schema({
  paymentIntentId: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  paymentReason: { type: String, required: true },
  status: { type: String, default: 'succeeded' }, 
  createdAt: { type: Date, default: Date.now },
});

export const Transaction = model('Transaction', transactionSchema);

