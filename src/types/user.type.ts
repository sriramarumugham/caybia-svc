import { Static, Type } from '@sinclair/typebox';
import { TypeCompiler } from '@sinclair/typebox/compiler';
import { createReferredUserDocument } from './referredusers.type';

export const UserType = Type.Object({
  userId: Type.String(),
  fullName: Type.String(),
  phoneNumber: Type.String(),
  countryCode: Type.String(),
  email: Type.String(),
  country: Type.String(),
  city: Type.String(),
  zip: Type.String(),
  address: Type.String(),
  password: Type.String(),
});

export type UserDocument = Static<typeof UserType>;

export const CreateUserDocument = Type.Intersect([
  Type.Pick(UserType, ['email', 'password']),
  createReferredUserDocument,
]);

export type CreateUserType = Static<typeof CreateUserDocument>;

export const UpdateUserProfileDocument = Type.Omit(UserType, [
  'userId',
  'email',
  'password',
]);

export type UpdateUserProfileType = Static<typeof UpdateUserProfileDocument>;

export const isValidProfile = TypeCompiler.Compile(UpdateUserProfileDocument);
