// src/routes/auth.route.ts
import { loginSchema } from '@/domain/auth/auth.request.schema';
import { loginUseCase } from '@/domain/auth/auth.usecase';
import { createUserRequestSchema } from '@/domain/user/user.request.schema';
import { creatUserUseCase, loginUserUseCase } from '@/domain/user/user.usecase';
import { loginRequestDocument } from '@/types/auth.type';
import { Static, TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import {
  createErrorResponse,
  createSuccessResponse,
} from '../../../../utils/response';

const AuthRoutes: FastifyPluginAsync = async (fastify) => {
  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .post(
      '/admin/login',
      {
        schema: loginSchema,
      },
      async (
        req: FastifyRequest<{
          Body: Static<typeof loginRequestDocument>;
        }>,
        res,
      ) => {
        try {
          const token = await loginUseCase(req.body, res);
          createSuccessResponse(res, 'Login successful', { token }, 200);
        } catch (error: any) {
          const message = error.message || 'An unexpected error occurred';
          const statusCode = error.status || 500;
          createErrorResponse(res, message, statusCode);
        }
      },
    )
    .post(
      '/user/login',
      { schema: loginSchema },
      async (
        req: FastifyRequest<{
          Body: Static<typeof loginSchema.body>;
        }>,
        res: FastifyReply,
      ) => {
        try {
          const token = await loginUserUseCase(req.body);
          createSuccessResponse(res, 'Login successful', { token }, 200);
        } catch (error: any) {
          const message = error.message || 'An unexpected error occurred';
          const statusCode = error.status || 500;
          createErrorResponse(res, message, statusCode);
        }
      },
    )
    .post(
      '/user/signup',
      { schema: createUserRequestSchema },
      async (
        req: FastifyRequest<{
          Body: Static<typeof createUserRequestSchema.body>;
        }>,
        res: FastifyReply,
      ) => {
        try {
          const token = await creatUserUseCase(req.body);
          createSuccessResponse(res, 'Signup successful', { token }, 200);
        } catch (error: any) {
          const message = error.message || 'An unexpected error occurred';
          const statusCode = error.status || 500;
          createErrorResponse(res, message, statusCode);
        }
      },
    );
};

export default AuthRoutes;
