"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const Repository_1 = require("./repositories/Repository");
const product_1 = __importDefault(require("./model/product"));
let ProductModel = mongoose_1.default.model("Product", product_1.default.schema);
const product = new ProductModel({
    productName: "laptop2",
    unitPrice: 150,
    unitsInStock: 120,
});
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const connectionUrl = process.env.CONNECTION_URL;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.listen(port, () => {
    const repository = new Repository_1.Repository(product_1.default);
    mongoose_1.default
        .connect(connectionUrl)
        .then(() => {
        console.log("connected to mongodb...");
        // const result = repository.find({ productName: product.productName });
        // result
        //   .then((response) => {
        //     if (response.length > 0) {
        //       console.log(response);
        //       console.log("ürünler listelendi");
        //     } else {
        //       const createdModel = repository.insert(product);
        //       createdModel.then((response) => {
        //         console.log(response.id);
        //         console.log("ürün ekledi");
        //       });
        //     }
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
    })
        .catch((error) => {
        console.log(error);
    });
    // const result2 = repository.findAll();
    // result2.then((response) => {
    //   console.log(response);
    // });
    let id;
    const result3 = repository.find({ productName: "laptop2" });
    result3.then((response) => {
        id = response[0]._id.toString();
        console.log(id);
        const result4 = repository.findById(id);
        result4.then((response) => {
            console.log(response);
        });
    });
});
