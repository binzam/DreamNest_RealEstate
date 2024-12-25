import { Schema, model, Types } from 'mongoose';

const addressSchema = new Schema(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  { _id: false }
);

const photoSchema = new Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
  },
  { _id: false }
);

const propertySchema = new Schema(
  {
    title: { type: String, required: true },
    address: addressSchema,
    price: { type: Number, required: true },
    bed: { type: Number, required: true },
    bath: { type: Number, required: true },
    sqft: { type: Number, required: true },
    photos: [photoSchema],
    detail: { type: String, required: true },
    category: { type: String, required: true, default: 'new-listings' },
    propertyFor: { type: String, required: true },
    propertyType: { type: String, required: true },
    owner: { type: Types.ObjectId, ref: 'User' },
    status: {
      type: String,
      enum: ['Available', 'Sold', 'Pending', 'Occupied', 'Unavailable'],
      default: 'Available',
    },

    discount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);
export const Property = model('Property', propertySchema);
