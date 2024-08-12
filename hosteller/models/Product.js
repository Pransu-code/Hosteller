import { model, models, Schema } from "mongoose";

const ProductSchema = new Schema({
  title: String,
  description: String,
  price: Number,
});
export const Product = models.Product || model("Product", ProductSchema);
// export const Product = model("Product", ProductSchema);
