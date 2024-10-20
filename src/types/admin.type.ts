import { Static, Type } from '@sinclair/typebox';

export enum E_ROLE {
  ADMIN = 'ADMIN',
  SUB_ADMIN = 'SUB_ADMIN',
}
export const AdminDocument = Type.Object({
  adminId: Type.Optional(Type.String()),
  fullName: Type.String(),
  email: Type.String(),
  phoneNumber: Type.String(),
  countryCode: Type.String(),
  country: Type.String(),
  password: Type.String(),
  role: Type.Enum(E_ROLE),
  createdBy: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  referralCode: Type.Optional(Type.String()),
});

export type AdminType = Static<typeof AdminDocument>;

export const AdminResponseDocument = Type.Omit(AdminDocument, ['password']);

export type AdminResponseType = Static<typeof AdminResponseDocument>;

export const createAdminDocument = Type.Omit(AdminDocument, [
  'createdBy',
  'role',
  'adminId',
  'referralCode',
]);

export type createAdminType = Static<typeof createAdminDocument>;
