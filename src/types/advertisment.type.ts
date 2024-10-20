import AdvertismentModel from '@/data-access/models/advertisment.schema';
import { Static, Type } from '@sinclair/typebox';

export enum E_STATUS {
  ACTIVE = 'ACTIVE',
  DELETED = 'DELETED',
  BLOCKED = 'BLOCKED',
}

export enum E_INVENTORY_STATUS {
  AVAILABLE = 'AVAILABLE',
  SOLD = 'SOLD',
  UNLIST = 'UNLIST',
}

export const AdvertismentType = Type.Object({
  advertismentId: Type.String(),
  productName: Type.String(),
  productDescription: Type.String(),
  views: Type.Number(),
  categoryName: Type.String(),
  categoryId: Type.String(),
  subcategoryName: Type.String(),
  subcategoryId: Type.String(),
  images: Type.Array(Type.String()),
  city: Type.String(),
  zip: Type.String(),
  address: Type.String(),
  createdBy: Type.String(),
  status: Type.Enum(E_STATUS),
  inventoryDetails: Type.Enum(E_INVENTORY_STATUS),
  productDetails: Type.Any(),
});

export type AdvertismentDocument = Static<typeof AdvertismentType>;

export const CreateAdvertismentRequestDocument = Type.Omit(AdvertismentType, [
  'advertismentId',
  'views',
  'createdBy',
]);

export type CreateAdvertismentRequestType = Static<
  typeof CreateAdvertismentRequestDocument
>;

export const UpdateInventoryDocument = Type.Pick(AdvertismentType, [
  'inventoryDetails',
]);

export type UpdateInventoryType = Static<typeof UpdateInventoryDocument>;

export const searchRequestDocument = Type.Intersect([
  Type.Pick(AdvertismentType, ['productName', 'categoryName']),
  Type.Object({ searchText: Type.String() }),
]);
export type searchRequestType = Static<typeof searchRequestDocument>;
