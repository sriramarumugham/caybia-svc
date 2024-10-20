import { AdminResponseType } from '@/types';
import { getUserIdFromRequestHeader } from '@/utils/auth.util';
import { Static, TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import {
  createAdminRequestSchema,
  createSubadminRequestSchema,
} from '../../../../domain/admin/admin.request-schema';
import {
  createAdminUseCase,
  createSubadminUseCase,
} from '../../../../domain/admin/admin.usecase';
import {
  createErrorResponse,
  createSuccessResponse,
} from '../../../../utils/response';

const AdminRoutes: FastifyPluginAsync = async (fastify) => {
  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .post(
      '/signup',
      { schema: createAdminRequestSchema },
      async (
        req: FastifyRequest<{
          Body: Static<typeof createAdminRequestSchema.body>;
        }>,
        res: FastifyReply,
      ) => {
        try {
          const admin: AdminResponseType = await createAdminUseCase(req.body);
          createSuccessResponse(res, 'Admin Created!', admin, 201);
        } catch (error: any) {
          const message = error.message || 'An unexpected error occurred';
          const statusCode = error.status || 500;
          createErrorResponse(res, message, statusCode);
        }
      },
    )
    .post(
      '/sub-admin',
      { schema: createSubadminRequestSchema },
      async (
        req: FastifyRequest<{
          Body: Static<typeof createSubadminRequestSchema.body>;
        }>,
        res: FastifyReply,
      ) => {
        try {
          const { userId } = getUserIdFromRequestHeader(req);
          const subadmin = await createSubadminUseCase(req.body, userId, res);
          createSuccessResponse(res, 'Subadmin Created!', subadmin, 201);
        } catch (error: any) {
          const message = error.message || 'An unexpected error occurred';
          const statusCode = error.status || 500;
          createErrorResponse(res, message, statusCode);
        }
      },
    );
};

export default AdminRoutes;
