import {
  createReferredUserDocument,
  CreateUserDocument,
  UpdateUserProfileDocument,
} from '@/types';
import { loginResponseDocument } from '@/types/auth.type';
import { ErrorResponses, SuccessResponseType } from '@/types/response.type';
import { FastifySchema } from 'fastify';

export const createUserRequestSchema = {
  tags: ['auth'],
  body: CreateUserDocument,
  response: {
    ...ErrorResponses,
    201: SuccessResponseType(loginResponseDocument),
  },
} satisfies FastifySchema;

export const updateUserProfile = {
  tags: ['user'],
  body: UpdateUserProfileDocument,
  response: {
    ...ErrorResponses,
    201: SuccessResponseType(loginResponseDocument),
  },
} satisfies FastifySchema;
