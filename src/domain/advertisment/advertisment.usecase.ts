import { isAdmin } from '@/data-access/admin.repo';
import AdvertismentModel from '@/data-access/models/advertisment.schema';
import UserModel from '@/data-access/models/user.schema';
import {
  AdvertismentDocument,
  CreateAdvertismentRequestType,
  E_INVENTORY_STATUS,
  E_STATUS,
  isValidProfile,
  UpdateInventoryType,
} from '@/types';
import { Product } from 'aws-sdk/clients/ssm';

export const createAdvertismentUseCase = async (
  body: CreateAdvertismentRequestType,
  userId: string,
) => {
  const user = await UserModel.findOne({ userId });
  if (!user) {
    throw new Error('User not found');
  }

  if (!isValidProfile.Check(user)) {
    throw new Error('User profile is incomplete. Please update your profile.');
  }

  await AdvertismentModel.create({
    ...body,
    status: 'AVAILABLE',
    createdAt: new Date(),
    createdBy: userId,
  });
};

export const deleteAdvertismentUseCase = async (
  advertismentId: string,
  userId: string,
) => {
  const advertisment = await AdvertismentModel.findOne({
    advertismentId: advertismentId,
    userId,
  });

  if (!advertisment) {
    throw new Error('Advertisement not found or access denied.');
  }

  await AdvertismentModel.updateOne({ status: E_STATUS.DELETED });
};

export const updateAdvertismentStatusUseCase = async (
  advertismentId: string,
  body: UpdateInventoryType,
  userId: string,
) => {
  const advertisment = await AdvertismentModel.findOne({
    advertismentId: advertismentId,
    userId,
  });

  if (!advertisment) {
    throw new Error('Advertisement not found or access denied.');
  }

  await AdvertismentModel.updateOne({
    inventoryDetails: body?.inventoryDetails,
  });
};

const INVENTORY_ORDER: Record<E_INVENTORY_STATUS, number> = {
  [E_INVENTORY_STATUS.AVAILABLE]: 1,
  [E_INVENTORY_STATUS.SOLD]: 2,
  [E_INVENTORY_STATUS.UNLIST]: 3,
};

export const getUserAdvertismentsUsecase = async (
  userId: string,
): Promise<AdvertismentDocument[]> => {
  const adverts = await AdvertismentModel.find<AdvertismentDocument>({
    userId,
    status: E_STATUS.ACTIVE,
  }).exec();

  return adverts.sort((a, b) => {
    return (
      INVENTORY_ORDER[a.inventoryDetails] - INVENTORY_ORDER[b.inventoryDetails]
    );
  });
};

export const blockAdvertismentUseCase = async (
  adminId: string,
  advertismentId: string,
): Promise<void> => {
  const isAdminUser = await isAdmin(adminId);

  if (!isAdminUser) {
    throw new Error('Only admins can update advertisement statuses');
  }

  await AdvertismentModel.findByIdAndUpdate(advertismentId, {
    status: E_STATUS.BLOCKED,
  });
};

export const getAdvertismentByStatus = async (
  adminId: string,
  status: E_STATUS,
): Promise<void> => {
  const isAdminUser = await isAdmin(adminId);

  if (!isAdminUser) {
    throw new Error('Only admins can  acces the  advertisement buystatuses');
  }

  await AdvertismentModel.find({
    status: status,
  });
};

export const searchProductsUseCase = async ({
  productName,
  categoryName,
  searchText,
}: {
  productName?: string;
  categoryName?: string;
  searchText: string; // Make sure this is included
}): Promise<Product[]> => {
  const query: any = {
    status: 'active',
    inventoryStatus: 'available',
  };

  // Construct the query based on the provided search parameters
  if (productName) {
    query.productName = { $regex: productName, $options: 'i' }; // Case-insensitive search
  }
  if (categoryName) {
    query.categoryName = { $regex: categoryName, $options: 'i' };
  }
  if (searchText) {
    query.$text = { $search: searchText }; // Assuming you're using text indexing in MongoDB
  }

  // Fetch products from the database based on the constructed query
  return await AdvertismentModel.find(query);
};

export const getAdvertismentByIdUsecase = async (id: string) => {
  return await AdvertismentModel.findOne({
    advertismentId: id,
    status: E_STATUS.ACTIVE, // Ensure the advertisement is active
  });
};
