import { Static, Type } from '@sinclair/typebox';

export const SubcategoryType = Type.Object({
  subcategoryId: Type.String(),
  categoryId: Type.String(),
  name: Type.String(),
  icon: Type.String(),
});

export type SubcategoryDocument = Static<typeof SubcategoryType>;

export const getSubCategoriesResponseDocument = Type.Array(SubcategoryType);

export type getSubCategoriesResponseType = Static<
  typeof getSubCategoriesResponseDocument
>;
