import { Type } from '@sinclair/typebox';

import {
  AuthHeaderDocument,
  ErrorResponses,
  SuccessResponseType,
} from '@/types/response.type';
import { FastifySchema } from 'fastify';
import {
  AdminResponseDocument,
  createAdminDocument,
} from '../../types/admin.type';

export const createAdminRequestSchema = {
  tags: ['admin'],
  body: createAdminDocument,
  response: {
    ...ErrorResponses,
    201: SuccessResponseType(AdminResponseDocument),
  },
} satisfies FastifySchema;

export const createSubadminRequestSchema = {
  tags: ['admin'],
  body: createAdminDocument,
  response: {
    ...ErrorResponses,
    201: SuccessResponseType(AdminResponseDocument),
  },
  security: [{ bearerAuth: [] }],
} satisfies FastifySchema;
