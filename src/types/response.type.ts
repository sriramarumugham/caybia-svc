import { TSchema, Type } from '@sinclair/typebox';

const CommonErrorResponse = Type.Object({
  status: Type.Optional(Type.String()),
  message: Type.Optional(Type.String()),
  timestamp: Type.Optional(Type.String()),
  errorSource: Type.Optional(Type.String()),
  errors: Type.Optional(Type.Any()),
});

export const ErrorResponses = {
  400: CommonErrorResponse,
  500: CommonErrorResponse,
  401: CommonErrorResponse,
};

export const SuccessResponseType = <T extends TSchema>(dataType?: T) =>
  Type.Object({
    status: Type.Optional(Type.String()),
    message: Type.String(),
    timestamp: Type.String(),
    ...(dataType ? { data: dataType } : {}),
  });

export const AuthHeaderDocument = Type.Object({
  authorization: Type.String({
    description: 'Bearer <token>',
  }),
});

export type AuthHeaderType = typeof AuthHeaderDocument;
