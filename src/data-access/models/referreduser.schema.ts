import mongoose, { Schema } from 'mongoose';
import { ReferredUserType } from '../../types';

const ReferredUserSchema: Schema<ReferredUserType> = new Schema(
  {
    referralCode: { type: String, required: true },
    userId: { type: String, required: true },
    referredBy: { type: String, required: true },
  },
  { timestamps: true },
);

const ReferredUserModel = mongoose.model<ReferredUserType>(
  'ReferredUser',
  ReferredUserSchema,
);
export default ReferredUserModel;
