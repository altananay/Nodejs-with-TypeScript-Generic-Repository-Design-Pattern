import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose, { ObjectId } from "mongoose";

import { Repository } from "./repositories/Repository";
import Product from "./model/product";
import { CreatedModel, RemovedModel, UpdatedModel } from "./utilities/entity";

let ProductModel = mongoose.model("Product", Product.schema);
const product = new ProductModel({
  productName: "laptop2",
  unitPrice: 150,
  unitsInStock: 120,
});

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const connectionUrl: string = process.env.CONNECTION_URL as string;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  const repository = new Repository(Product);
  mongoose
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

  let id!: string;

  const result3 = repository.find({ productName: "laptop2" });
  result3.then((response) => {
    id = response[0]._id.toString();
    console.log(id);
    const result4 = repository.findById(id);
    result4.then((response) => {
      console.log(response);
    })
  });
  
});
