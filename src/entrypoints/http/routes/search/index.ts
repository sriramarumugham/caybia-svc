import {
  getAdvertismentByIdRequestSchema,
  searchRequestSchema,
} from '@/domain/advertisment/advertisment.request-schema';
import {
  getAdvertismentByIdUsecase,
  searchProductsUseCase,
} from '@/domain/advertisment/advertisment.usecase';
import { searchRequestType } from '@/types';
import { createErrorResponse, createSuccessResponse } from '@/utils/response';
import { Static, TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify'; // Import the search use case
import { searchRequestDocument } from '../../../../types/advertisment.type';

const SearchRoute: FastifyPluginAsync = async (fastify) => {
  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .get(
      '/',
      { schema: searchRequestSchema },
      async (
        req: FastifyRequest<{
          Querystring: Static<typeof searchRequestDocument>; // Ensure correct type
        }>,
        res: FastifyReply,
      ) => {
        try {
          const { productName, categoryName, searchText } = req.query;

          const products = await searchProductsUseCase({
            productName,
            categoryName,
            searchText,
          });

          createSuccessResponse(
            res,
            'Search results fetched successfully!',
            products,
          );
        } catch (error: any) {
          const message = error.message || 'An unexpected error occurred';
          const statusCode = error.status || 500;
          createErrorResponse(res, message, statusCode);
        }
      },
    )
    .get(
      '/:id', // Parameterized route for fetching by ID
      {
        schema: getAdvertismentByIdRequestSchema,
      },
      async (
        req: FastifyRequest<{
          Params: { id: string }; // Define the type for the params
        }>,
        res: FastifyReply,
      ) => {
        try {
          const { id } = req.params; // Extract ID from request parameters

          // Fetch the advertisement by ID and ensure it is active
          const advertisment = await getAdvertismentByIdUsecase(id);

          if (!advertisment) {
            return createErrorResponse(
              res,
              'Advertisement not found or inactive',
              404,
            );
          }

          createSuccessResponse(
            res,
            'Advertisement fetched successfully!',
            advertisment,
          );
        } catch (error: any) {
          const message = error.message || 'An unexpected error occurred';
          const statusCode = error.status || 500;
          createErrorResponse(res, message, statusCode);
        }
      },
    );
};

export default SearchRoute;
