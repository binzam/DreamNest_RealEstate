import { Schema, model, Types } from 'mongoose';

const notificationSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['tour', 'message', 'alert'],
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Read', 'Acknowledged'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

export default model('Notification', notificationSchema);
