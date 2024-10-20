import CategoryModel from '@/data-access/models/category.schema';
import SubcategoryModel from '@/data-access/models/subcategory.schema';
import { CategoryDocument, SubcategoryDocument } from '@/types';

export const createCategoryUseCase = async (body: CategoryDocument) => {
  const newCategory = await CategoryModel.create(body);
  return newCategory;
};

export const createSubcategoryUseCase = async (body: SubcategoryDocument) => {
  const newSubcategory = await SubcategoryModel.create(body);
  return newSubcategory;
};

export const getCatagoriesUseCase = async () => {
  return await CategoryModel.find();
};

export const getAllSubcatagoriesByCatagoriesId = async (categoryId: string) => {
  return await SubcategoryModel.find({ categoryId: categoryId });
};
