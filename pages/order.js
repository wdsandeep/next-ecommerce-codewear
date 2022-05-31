import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Order from "../models/Order";
import mongoose from "mongoose";

const MyOrder = ({ order }) => {
  console.log(order);
  const products = order.products;
  return (
    <div>
      <Head>
        <title>Order - Codeswear</title>
      </Head>

      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                CODESWEAR.com
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                Order Id: #{order.orderId}
              </h1>
              <p className="leading-relaxed mb-4">
                Your order has been successfully placed. Your payment status is:
                &nbsp;
                <b>{order.status}</b>.
              </p>
              <div className="flex mb-4">
                <a className="flex-grow  text-center  text-lg px-1">
                  Item Description
                </a>
                <a className="flex-grow text-center  text-lg px-1">Quantity</a>
                <a className="flex-grow  text-center text-lg px-1">
                  Item Total
                </a>
              </div>
              {Object.keys(products).map((key) => {
                return (
                  <div key={key} className="flex border-t border-gray-200 py-2">
                    <span className="text-gray-500">{products[key].name}</span>

                    <span className="m-auto text-gray-900">
                      {products[key].qty}
                    </span>
                    <span className="m-auto text-gray-900">
                      ₹{products[key].price}
                    </span>
                  </div>
                );
              })}

              <div className="flex flex-col">
                <div className="title-font font-medium my-8 text-2xl text-gray-900">
                  Subtotal ₹{order.amount}
                </div>
                <div className="my-4">
                  <button className="flex mx-0 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">
                    Track Order
                  </button>
                </div>
              </div>
            </div>
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src="/order.jpg"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let order = await Order.findById({ _id: context.query.id });
  console.log("order", order);

  // console.log(products);

  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
    },
  };
}

export default MyOrder;
