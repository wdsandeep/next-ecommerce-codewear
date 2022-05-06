import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Orders = () => {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: localStorage.getItem("token") }),
      });
      let res = await a.json();
      // console.log(res);
      setOrders(res.orders);
    };

    if (!localStorage.getItem("token")) {
      router.push("/");
    } else {
      fetchOrders();
    }
  }, [router.query]);

  return (
    <div className="min-h-screen">
      <div className="container  mx-auto">
        <h1 className="font-semibold text-2xl p-8 text-center">My Orders</h1>
        <div className="items">
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full">
                    <thead className="bg-white border-b">
                      <tr>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          #Order Id
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Amount
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Status & Details
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders &&
                        orders.map((item) => {
                          console.log(item);
                          return (
                            <tr
                              key={item._id}
                              className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {item.orderId}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {item.email}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {item.amount}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {item.status}&nbsp;
                                <Link href={"/order?id=" + item._id}>
                                  <a>Details</a>
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
