import { Schema, model, Types } from 'mongoose';

const tourScheduleSchema = new Schema(
  {
    propertyId: {
      type: Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    viewingDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['Scheduled', 'Completed', 'Cancelled'],
      default: 'Scheduled',
    },
  },
  { timestamps: true }
);

export const TourSchedule = model('TourSchedule', tourScheduleSchema);
