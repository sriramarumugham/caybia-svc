import { Static, Type } from '@sinclair/typebox';

export const ReferredUserDocument = Type.Object({
  referralCode: Type.String(),
  userId: Type.String(),
  referredBy: Type.String(),
});

export type ReferredUserType = Static<typeof ReferredUserDocument>;

export const referralCodeType = Type.Pick(ReferredUserDocument, [
  'referralCode',
]);

export const createReferredUserDocument = Type.Optional(referralCodeType);

export type createReferredUserType = Static<typeof createReferredUserDocument>;
