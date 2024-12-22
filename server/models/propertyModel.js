import { Schema, model, Types } from 'mongoose';

const addressSchema = new Schema(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String, required: false }, // Optional postal code field
  },
  { _id: false }
); // This makes it a subdocument without its own ID

const photoSchema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
});

const reviewSchema = new Schema({
  userId: { type: Types.ObjectId, ref: 'User', required: true },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    default: 5,
  },
  reviewText: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});
const propertySchema = new Schema(
  {
    name: { type: String, required: true },
    // street: { type: String, required: true },
    // city: { type: String, required: true },
    // country: { type: String, required: true },
    // state: { type: String, required: true },
    address: addressSchema,
    price: { type: Number, required: true },
    bed: { type: Number, required: true },
    bath: { type: Number, required: true },
    sqft: { type: Number, required: true },
    image: { type: String, required: true },
    photos: [photoSchema],
    detail: { type: String, required: true },
    category: { type: String, required: true },
    propertyFor: { type: String, required: true },
    propertyType: { type: String, required: true },
    owner: { type: Types.ObjectId, ref: 'User' },
    status: {
      type: String,
      enum: ['Available', 'Sold', 'Pending', 'Occupied', 'Unavailable'],
      default: 'Available',
    },
    dateListed: {
      type: Date,
      default: Date.now,
    },
    reviews: [reviewSchema],
    averageRating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    featured: { type: Boolean, default: false }, // Optional: Featured property flag
    amenities: [{ type: String }], // Optional: Array for amenities like Pool, Gym, etc.
    views: { type: Number, default: 0 }, // O
  },
  {
    timestamps: true,
  }
);
propertySchema.index({ latitude: 1, longitude: 1 }, { sparse: true });
export const Property = model('Property', propertySchema);
