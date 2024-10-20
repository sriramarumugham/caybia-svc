import { loginRequestDocument, loginResponseDocument } from '@/types/auth.type';
import { ErrorResponses, SuccessResponseType } from '@/types/response.type';
import { FastifySchema } from 'fastify';

export const loginSchema = {
  tags: ['auth'],
  body: loginRequestDocument,
  response: {
    ...ErrorResponses,
    200: SuccessResponseType(loginResponseDocument),
  },
} satisfies FastifySchema;
