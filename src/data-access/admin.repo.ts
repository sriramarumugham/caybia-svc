import { AdminType, E_ROLE } from '../types/admin.type';
import AdminModel from './models/admin.schema';

export const createAdminRepo = async (
  adminData: Partial<AdminType>,
): Promise<AdminType> => {
  return await AdminModel.create(adminData);
};

export const getAdminByEmailRepo = async (
  email: string,
): Promise<AdminType | null> => {
  const admin = await AdminModel.findOne({ email });
  return admin ? admin.toObject() : null;
};

export const getAdminByAdminId = async (
  adminId: string,
): Promise<AdminType | null> => {
  return await AdminModel.findOne({ adminId: adminId });
};

export const isAdmin = async (adminId: string): Promise<boolean> => {
  const admin = await AdminModel.findOne({ adminId });
  return admin?.role === E_ROLE.ADMIN;
};
