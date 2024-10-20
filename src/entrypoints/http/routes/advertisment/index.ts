//  create advertisment
//   before creatina an advertisment user hast to complet his profile

import {
  blockAdvertismentSchema,
  createAdvertismentRequestSchema,
  deleteAdvertismentSchema,
  getAdvertismentByStatusSchema,
  getPublishedAdvertisementsSchema,
  updateAdvertismentInverntorySchema,
} from '@/domain/advertisment/advertisment.request-schema';
import {
  blockAdvertismentUseCase,
  createAdvertismentUseCase,
  deleteAdvertismentUseCase,
  getAdvertismentByStatus,
  getUserAdvertismentsUsecase,
  updateAdvertismentStatusUseCase,
} from '@/domain/advertisment/advertisment.usecase';
import { getUserIdFromRequestHeader } from '@/utils/auth.util';
import { createErrorResponse, createSuccessResponse } from '@/utils/response';
import { Static, TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';

const AdvertismentRoutes: FastifyPluginAsync = async (fastify) => {
  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .post(
      '/advertisment',
      { schema: createAdvertismentRequestSchema },
      async (
        req: FastifyRequest<{
          Body: Static<typeof createAdvertismentRequestSchema.body>;
        }>,
        res: FastifyReply,
      ) => {
        try {
          const user = getUserIdFromRequestHeader(req);
          await createAdvertismentUseCase(req.body, user.userId);
          createSuccessResponse(res, 'Advertisment created!');
        } catch (error: any) {
          const message = error.message || 'An unexpected error occurred';
          const statusCode = error.status || 500;
          createErrorResponse(res, message, statusCode);
        }
      },
    )
    .patch(
      '/advertisment/:id/inventoryDetails',
      { schema: updateAdvertismentInverntorySchema },
      async (
        req: FastifyRequest<{
          Params: { id: string };
          Body: Static<typeof updateAdvertismentInverntorySchema.body>;
        }>,
        res: FastifyReply,
      ) => {
        try {
          const user = getUserIdFromRequestHeader(req);
          await updateAdvertismentStatusUseCase(
            req.params.id,
            req.body,
            user.userId,
          );
          createSuccessResponse(res, 'Advertisement status updated!');
        } catch (error: any) {
          const message = error.message || 'An unexpected error occurred';
          const statusCode = error.status || 500;
          createErrorResponse(res, message, statusCode);
        }
      },
    )
    .delete(
      '/advertisment/:id',
      { schema: deleteAdvertismentSchema },
      async (
        req: FastifyRequest<{ Params: { id: string } }>,
        res: FastifyReply,
      ) => {
        try {
          const user = getUserIdFromRequestHeader(req);
          await deleteAdvertismentUseCase(req.params.id, user.userId);
          createSuccessResponse(res, 'Advertisement deleted successfully!');
        } catch (error: any) {
          const message = error.message || 'An unexpected error occurred';
          const statusCode = error.status || 500;
          createErrorResponse(res, message, statusCode);
        }
      },
    )
    .get(
      '/published',
      { schema: getPublishedAdvertisementsSchema },
      async (req: FastifyRequest, res: FastifyReply) => {
        try {
          const user = getUserIdFromRequestHeader(req);
          const advertisments = await getUserAdvertismentsUsecase(user.userId);
          createSuccessResponse(
            res,
            'Advertisements fetched successfully!',
            advertisments,
          );
        } catch (error: any) {
          createErrorResponse(
            res,
            error.message || 'An unexpected error occurred',
            error.status || 500,
          );
        }
      },
    )
    .get(
      '/admin/advertisments',
      { schema: getAdvertismentByStatusSchema }, // Add schema here
      async (
        req: FastifyRequest<{
          Querystring: Static<typeof getAdvertismentByStatusSchema.querystring>;
        }>,
        res: FastifyReply,
      ) => {
        try {
          const admin = getUserIdFromRequestHeader(req);
          const { status } = req.query; // Extract status from query
          const advertisments = await getAdvertismentByStatus(
            admin.userId,
            status,
          );
          createSuccessResponse(
            res,
            'Advertisements fetched successfully!',
            advertisments,
          );
        } catch (error: any) {
          createErrorResponse(
            res,
            error.message || 'An unexpected error occurred',
            error.status || 500,
          );
        }
      },
    )
    .post(
      '/admin/block/:advertismentId',
      { schema: blockAdvertismentSchema }, // Add schema here
      async (
        req: FastifyRequest<{
          Params: Static<typeof blockAdvertismentSchema.params>;
        }>,
        res: FastifyReply,
      ) => {
        try {
          const admin = getUserIdFromRequestHeader(req);
          const { advertismentId } = req.params; // Extract advertisement ID from params
          await blockAdvertismentUseCase(admin.userId, advertismentId); // Call the blocking use case
          createSuccessResponse(res, 'Advertisement blocked successfully!');
        } catch (error: any) {
          createErrorResponse(
            res,
            error.message || 'An unexpected error occurred',
            error.status || 500,
          );
        }
      },
    );
};

export default AdvertismentRoutes;
