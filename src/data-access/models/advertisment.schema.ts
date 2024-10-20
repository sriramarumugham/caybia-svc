import { getUUID } from '@/utils/uuid.util';
import mongoose, { Schema } from 'mongoose';
import {
  AdvertismentDocument,
  E_INVENTORY_STATUS,
  E_STATUS,
} from '../../types';

const AdvertismentSchema: Schema<AdvertismentDocument> = new Schema(
  {
    advertismentId: { type: String, rquired: true, default: getUUID },
    productName: { type: String, required: true },
    productDescription: { type: String, required: true },
    views: { type: Number, required: false },
    categoryName: { type: String, required: true },
    categoryId: { type: String, required: true },
    subcategoryName: { type: String, required: true },
    subcategoryId: { type: String, required: true },
    images: [{ type: String, required: true }],
    city: { type: String, required: true },
    zip: { type: String, required: true },
    address: { type: String, required: true },
    createdBy: { type: String, required: true },
    status: { type: String, default: E_STATUS.ACTIVE, required: true },
    inventoryDetails: {
      type: String,
      default: E_INVENTORY_STATUS.AVAILABLE,
      required: true,
    },
    productDetails: { type: Schema.Types.Mixed, required: false },
  },
  { timestamps: true },
);

const AdvertismentModel = mongoose.model<AdvertismentDocument>(
  'Advertisment',
  AdvertismentSchema,
);
export default AdvertismentModel;
