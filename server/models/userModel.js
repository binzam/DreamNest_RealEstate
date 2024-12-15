import { Schema, model, Types } from 'mongoose';

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    profilePicture: {
      type: String,
      default: '',
    },

    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    resetToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const User = model('User', userSchema);
