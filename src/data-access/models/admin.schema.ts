import { AdminType, E_ROLE } from '@/types';
import { getUUID } from '@/utils/uuid.util';
import mongoose, { Schema } from 'mongoose';

const AdminSchema: Schema<AdminType> = new Schema(
  {
    adminId: {
      type: String,
      rquired: true,
      default: getUUID,
    },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, default: null },
    country: { type: String, default: null },
    countryCode: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: E_ROLE.ADMIN, required: true },
    createdBy: { type: String, default: null },
    referralCode: { type: String, default: null },
  },
  { timestamps: true },
);

const AdminModel = mongoose.model<AdminType>('Admin', AdminSchema);
export default AdminModel;
