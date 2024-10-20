import mongoose, { Schema } from "mongoose";
import { CategoryDocument } from "../../types";

const CategorySchema: Schema<CategoryDocument> = new Schema({
  categoryId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  icon: { type: String, required: true },
});

const CategoryModel = mongoose.model<CategoryDocument>('Category', CategorySchema);
export default CategoryModel;
