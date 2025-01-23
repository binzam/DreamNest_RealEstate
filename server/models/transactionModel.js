import mongoose, { Schema, model, Types } from 'mongoose';

const transactionSchema = new Schema(
  {
    paymentIntentId: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    customerName: { type: String, required: true },
    customerId: { type: Types.ObjectId, ref: 'User', required: true },
    paymentReason: { type: String, required: true },
    tempPropertyId: { type: String },
    propertyId: { type: Types.ObjectId, ref: 'Property' },
    customerEmail: { type: String, required: true },
    tempTourId: { type: String },
    tourId: { type: Types.ObjectId, ref: 'Tour' },
    status: { type: String, default: 'succeeded' },
    metadata: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

export const Transaction = model('Transaction', transactionSchema);
