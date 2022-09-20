"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let productSchema = new mongoose_1.default.Schema({
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
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const Product = mongoose_1.default.model("Product", productSchema);
exports.default = Product;
