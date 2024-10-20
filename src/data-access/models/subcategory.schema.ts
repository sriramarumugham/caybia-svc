import mongoose, { Schema } from 'mongoose';
import { SubcategoryDocument } from '../../types';

const SubcategorySchema: Schema<SubcategoryDocument> = new Schema({
  subcategoryId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  icon: { type: String, required: true },
  categoryId: { type: String, required: true },
});

const SubcategoryModel = mongoose.model<SubcategoryDocument>(
  'Subcategory',
  SubcategorySchema,
);
export default SubcategoryModel;
