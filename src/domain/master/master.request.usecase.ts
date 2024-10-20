import {
  CategoryType,
  getCategoriesDocument,
  getSubCategoriesResponseDocument,
  SubcategoryType,
} from '@/types';
import { ErrorResponses, SuccessResponseType } from '@/types/response.type';
import { Type } from '@sinclair/typebox';
import { FastifySchema } from 'fastify';
import { request } from 'http';

export const createCategories = {
  tags: ['master'],
  body: CategoryType,
  response: {
    ...ErrorResponses,
    200: SuccessResponseType(),
  },
} satisfies FastifySchema;

export const createSubCategoriesRequestSchema = {
  tags: ['master'],
  body: SubcategoryType,
  response: {
    ...ErrorResponses,
    200: SuccessResponseType(),
  },
} satisfies FastifySchema;

export const getCategoriesRequestSchema = {
  tags: ['master'],
  response: {
    ...ErrorResponses,
    200: SuccessResponseType(getCategoriesDocument),
  },
};

export const getSubCategoriesRequestSchema = {
  tags: ['master'],
  params: Type.Object({
    categoriesId: Type.String(), // Adding categoriesId as a path parameter
  }),
  response: {
    ...ErrorResponses,
    200: SuccessResponseType(getSubCategoriesResponseDocument),
  },
};
