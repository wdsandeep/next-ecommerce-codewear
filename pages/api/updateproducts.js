// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Product from "../../models/Product";
import connectDB from "../../middleware/mongoose";
const handler = async (req, res) => {
  if (req.method == "POST") {
    for (let i = 0; i < req.body.length; i++) {
      let p = await Product.findByIdAndUpdate(req.body[i]._id, req.body[i]);
    }
    res.status(200).json({ success: "Updated Product(s)" });
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
  //   let products = await Product.find();
  //   res.status(200).json({ products: products });
};

export default connectDB(handler);
