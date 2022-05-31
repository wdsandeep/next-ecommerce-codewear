import Order from "../../models/Order";
import Product from "../../models/Product";
import connectDB from "../../middleware/mongoose";
import pincodes from "../../pincodes.json";

const https = require("https");
/*
 * import checksum generation utility
 * You can get this utility from https://developer.paytm.com/docs/checksum/
 */
const PaytmChecksum = require("paytmchecksum");

const handler = async (req, res) => {
  if (req.method == "POST") {
    //check if the pincode is serviceable
    if (!Object.keys(pincodes).includes(req.body.pincode)) {
      res.status(200).json({
        success: false,
        error: "The pincode you have entered is not serviceable!",
        cartClear: false,
      });
      return;
    }

    // Check if the cart is tampered with -- [Pending]
    let product,
      sumTotal = 0;
    for (let item in req.body.cart) {
      // console.log(item);
      sumTotal += req.body.cart[item].price * req.body.cart[item].qty;
      product = await Product.findOne({ slug: item });

      // Check if the cart items are out of stock -- [Pending]
      if (product.availableQty < req.body.cart[item].qty) {
        res.status(200).json({
          success: false,
          error: "Some itme in your cart went out of stock. Please try again!",
          cartClear: true,
        });
        return;
      }
      if (product.price != req.body.cart[item].price) {
        res.status(200).json({
          success: false,
          error:
            "The price of some items in your cart have changed. Please try again.",
          cartClear: true,
        });
        return;
      }
    }

    if (sumTotal !== req.body.subTotal) {
      res.status(200).json({ success: false, error: true });
      return;
    }

    // Check if the details are valid -- [Pending]

    //Initiate an order corresponding to this ordr id
    // console.log(req.body);
    let order = new Order({
      email: req.body.email,
      orderId: req.body.orderId,
      address: req.body.address,
      amount: req.body.subTotal,
      products: req.body.cart,
    });
    await order.save();

    // Insert an entry in the Orders table with status as pending

    var paytmParams = {};

    paytmParams.body = {
      requestType: "Payment",
      mid: process.env.NEXT_PUBLIC_PAYTM_MID,
      websiteName: "YOUR_WEBSITE_NAME",
      orderId: req.body.oid,
      callbackUrl: `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
      txnAmount: {
        value: req.body.subTotal,
        currency: "INR",
      },
      userInfo: {
        custId: req.body.email,
      },
    };

    /*
     * Generate checksum by parameters we have in body
     * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
     */
    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      process.env.NEXT_PUBLIC_PAYTM_MKEY
    );

    paytmParams.head = {
      signature: checksum,
    };

    var post_data = JSON.stringify(paytmParams);

    const requestAsync = async () => {
      return new Promise((resolve, reject) => {
        var options = {
          /* for Staging */
          // hostname: "securegw-stage.paytm.in"
          /* for Production */
          hostname: "securegw.paytm.in",

          port: 443,
          path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.oid}`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": post_data.length,
          },
        };

        var response = "";
        var post_req = https.request(options, function (post_res) {
          post_res.on("data", function (chunk) {
            response += chunk;
          });

          post_res.on("end", function () {
            // console.log("Response: ", response);
            response.success = true;
            resolve(response);
          });
        });

        post_req.write(post_data);
        post_req.end();
      });
    };

    let myr = await requestAsync();
    res.status(200).json(myr);
  } else {
    res.status(200).json({ status: "You are supposed to send post request." });
  }
};

export default connectDB(handler);
