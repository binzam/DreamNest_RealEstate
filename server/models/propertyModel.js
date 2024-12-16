import { Schema, model } from 'mongoose';

const photoSchema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
});

const propertySchema = new Schema(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
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
  },
  {
    timestamps: true,
  }
);

export const Property = model('Property', propertySchema);
