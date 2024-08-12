import mongoose from "mongoose";
import { Product } from "../../models/Product";
import { mongooseConnect } from "../../lib/mongoose";

export default async function handle(req, res) {
  const { method } = req;

  await mongooseConnect();

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      res.json(await Product.find());
    }
  }

  if (method === "POST") {
    const { title, description, price } = req.body;

    const productDoc = await Product.create({
      title,
      description,
      price,
    });
    // console.log("print");
    // await Product.deleteMany({});
    // console.log("run");

    res.json(productDoc);
  }

  if (method === "PUT") {
    const { title, description, price, _id } = req.body;
    await Product.updateOne({ _id},{title:title, description:description, price:price });
    res.json(true);
  }

  if (method === "DELETE") {
     console.log("Print");

    if (req.query?.id) {
      await Product.deleteOne({ _id: req.query?.id });
      res.json(true);
    }
  }
}
