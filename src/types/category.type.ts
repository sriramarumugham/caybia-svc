import { Static, Type } from '@sinclair/typebox';

export const CategoryType = Type.Object({
  categoryId: Type.String(),
  name: Type.String(),
  icon: Type.String(),
});

export type CategoryDocument = Static<typeof CategoryType>;

export const getCategoriesDocument = Type.Array(CategoryType);

export type getCategoriesType = Static<typeof getCategoriesDocument>;
