import { loginUseCase } from '@/domain/auth/auth.usecase';
import {
  createCategories,
  createSubCategoriesRequestSchema,
  getSubCategoriesRequestSchema,
} from '@/domain/master/master.request.usecase';
import {
  createCategoryUseCase,
  createSubcategoryUseCase,
  getAllSubcatagoriesByCatagoriesId,
  getCatagoriesUseCase,
} from '@/domain/master/master.usecase';
import { CategoryDocument, SubcategoryDocument } from '@/types';
import { loginRequestDocument } from '@/types/auth.type';
import { Static, TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import {
  createErrorResponse,
  createSuccessResponse,
} from '../../../../utils/response';

const MasterRoutes: FastifyPluginAsync = async (fastify) => {
  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .post(
      '/category',
      {
        schema: createCategories,
      },
      async (
        req: FastifyRequest<{
          Body: CategoryDocument;
        }>,
        res,
      ) => {
        try {
          await createCategoryUseCase(req.body);
          createSuccessResponse(res, 'category created!');
        } catch (error: any) {
          const message = error.message || 'An unexpected error occurred';
          const statusCode = error.status || 500;
          createErrorResponse(res, message, statusCode);
        }
      },
    )
    .post(
      '/subcategory',
      {
        schema: createSubCategoriesRequestSchema,
      },
      async (
        req: FastifyRequest<{
          Body: SubcategoryDocument;
        }>,
        res,
      ) => {
        try {
          await createSubcategoryUseCase(req.body);
          createSuccessResponse(res, 'subcategory created!');
        } catch (error: any) {
          const message = error.message || 'An unexpected error occurred';
          const statusCode = error.status || 500;
          createErrorResponse(res, message, statusCode);
        }
      },
    )
    .get(
      '/categories',
      {
        schema: getSubCategoriesRequestSchema,
      },
      async (req, res: FastifyReply) => {
        try {
          const categories = await getCatagoriesUseCase();
          createSuccessResponse(
            res,
            'Categories retrieved successfully',
            categories,
          );
        } catch (error: any) {
          const message = error.message || 'An unexpected error occurred';
          const statusCode = error.status || 500;
          createErrorResponse(res, message, statusCode);
        }
      },
    )
    .get(
      '/subcatagories/:catagoriesId',
      {
        schema: getSubCategoriesRequestSchema,
      },
      async (req, res: FastifyReply) => {
        try {
          const subCatagories =
            await getAllSubcatagoriesByCatagoriesId('fsdfs');
          createSuccessResponse(
            res,
            'Sub catagories retrieved successfully',
            subCatagories,
          );
        } catch (error: any) {
          const message = error.message || 'An unexpected error occurred';
          const statusCode = error.status || 500;
          createErrorResponse(res, message, statusCode);
        }
      },
    );
};

export default MasterRoutes;
