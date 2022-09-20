import mongoose from "mongoose";

export type ProductModel = mongoose.Document & {
    productName: string,
    unitPrice: number,
    unitsInStock: number,
    createdAt: Date,
}

let productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  unitsInStock: {
    type: Number,
    required: true,
  },
  createdAt : {
    type: Date,
    default: Date.now
  }
});

const Product = mongoose.model<ProductModel>("Product", productSchema);
export default Product;