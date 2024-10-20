import { getUUID } from '@/utils/uuid.util';
import mongoose, { Schema } from 'mongoose';
import { UserDocument } from '../../types';

const UserSchema: Schema<UserDocument> = new Schema(
  {
    userId: {
      type: String,
      rquired: true,
      default: getUUID,
    },
    fullName: { type: String },
    phoneNumber: { type: String },
    countryCode: { type: String },
    email: { type: String, required: true, unique: true },
    city: { type: String },
    country: { type: String },
    zip: { type: String },
    address: { type: String },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

const UserModel = mongoose.model<UserDocument>('User', UserSchema);
export default UserModel;
