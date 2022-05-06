// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../models/User";
import connectDB from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method == "POST") {
    // console.log(req.body);

    let user = await User.findOne({ email: req.body.email });
    if (user) {
      const bytes = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET);
      var originalPassword = bytes.toString(CryptoJS.enc.Utf8);
      // console.log(req.body.password, originalPassword);

      if (
        req.body.email == user.email &&
        req.body.password == originalPassword
      ) {
        var token = jwt.sign(
          { email: user.email, name: user.name },
          process.env.JWT_SECRET,
          { expiresIn: "2d" }
        );
        res.status(200).json({ token, success: true });
      } else {
        res.status(400).json({
          success: false,
          error: "Invalid Credentials",
        });
      }
    } else {
      res.status(400).json({ success: false, error: "No user Found" });
    }
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDB(handler);
