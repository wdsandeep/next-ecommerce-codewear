import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AiOutlineShoppingCart,
  AiFillCloseCircle,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";

const Navbar = ({
  user,
  logout,
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
}) => {
  const [dropdown, setDropdown] = useState(false);

  // console.log(cart, addToCart, removeFromCart, clearCart, subTotal);
  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (ref.current.classList.contains("translate-x-0")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };
  const ref = useRef();
  return (
    <div className="flex flex-col md:flex-row md:justify-start justify-center items-center my-1 shadow-md sticky top-0 bg-white z-10">
      <div className="logo mr-auto md:mx-5">
        <Link href={"/"}>
          <a>
            <Image src="/logo.png" width={200} height={40} alt="Main Logo" />
          </a>
        </Link>
      </div>

      <div className="nav">
        <ul className="flex items-center space-x-6 font-bold md:text-md">
          <Link href={"/tshirts"}>
            <a>
              <li className="hover:text-pink-600">Tshirts</li>
            </a>
          </Link>
          <Link href={"/hoodies"}>
            <a>
              <li className="hover:text-pink-600">Hoodies</li>
            </a>
          </Link>
          <Link href={"/mugs"}>
            <a>
              <li className="hover:text-pink-600">Mugs</li>
            </a>
          </Link>
          <Link href={"/stickers"}>
            <a>
              <li className="hover:text-pink-600">Stickers</li>
            </a>
          </Link>
        </ul>
      </div>

      <div className="cart absolute right-0 mx-5 top-2 md:top-3 cursor-pointer flex items-center">
        <span
          onMouseOver={() => {
            setDropdown(true);
          }}
          onMouseLeave={() => {
            setDropdown(false);
          }}
        >
          {dropdown && (
            <div
              onMouseOver={() => {
                setDropdown(true);
              }}
              onMouseLeave={() => {
                setDropdown(false);
              }}
              className="absolute right-8  bg-white shadow-lg border top-6 rounded-md px-5 w-36 "
            >
              <ul>
                <Link href={"/myaccount"}>
                  <a>
                    <li className="py-1 text-sm hover:text-pink-600 font-semibold">
                      My Account
                    </li>
                  </a>
                </Link>
                <Link href={"/orders"}>
                  <a>
                    <li className="py-1 text-sm hover:text-pink-600 font-semibold">
                      Orders
                    </li>
                  </a>
                </Link>

                <li
                  onClick={logout}
                  className="py-1 text-sm hover:text-pink-600 font-semibold"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
          {user.value && (
            <MdAccountCircle className="text-xl md:text-2xl mx-2 " />
          )}
        </span>
        {!user.value && (
          <Link href={"/login"}>
            <a>
              <button className="bg-pink-600 px-2 mx-2 py-1 rounded-md text-xs text-white">
                Login
              </button>
            </a>
          </Link>
        )}
        <AiOutlineShoppingCart
          onClick={toggleCart}
          className="text-xl md:text-2xl "
        />
      </div>

      <div
        ref={ref}
        className={`sidecart overflow-y-auto w-72 h-[100vh] absolute top-0 right-0 bg-pink-100 py-10 px-8 transform transition-transform ${
          Object.keys(cart).length === 0 ? "translate-x-full" : "translate-x-0"
        }  `}
      >
        <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
        <span
          onClick={toggleCart}
          className="absolute top-5 right-2 cursor-pointer text-2xl text-pink-500"
        >
          <AiFillCloseCircle />
        </span>
        <ol className=" list-decimal font-semibold">
          {Object.keys(cart).length <= 0 && (
            <div className="my-4 text-base font-semibold">
              Your cart is Empty!
            </div>
          )}
          {Object.keys(cart) &&
            Object.keys(cart).map((k) => {
              return (
                <li key={k}>
                  <div className="item flex my-5  ">
                    <div className="w-2/3 font-semibold">
                      {cart[k].name} ({cart[k].size}/{cart[k].variant})
                    </div>
                    <div className="w-1/3 font-semibold flex items-center justify-center text-lg">
                      <AiFillMinusCircle
                        onClick={() => {
                          removeFromCart(
                            k,
                            1,
                            cart[k].price,
                            cart[k].name,
                            cart[k].size,
                            cart[k].variant
                          );
                        }}
                        className="text-pink-500 cursor-pointer"
                      />
                      <span className="mx-2 text-sm">{cart[k].qty}</span>
                      <AiFillPlusCircle
                        onClick={() => {
                          addToCart(
                            k,
                            1,
                            cart[k].price,
                            cart[k].name,
                            cart[k].size,
                            cart[k].variant
                          );
                        }}
                        className="text-pink-500 cursor-pointer"
                      />
                    </div>
                  </div>
                </li>
              );
            })}
        </ol>
        <div className="total font-bold my-3">Subtotal: ₹{subTotal}</div>

        <div className="flex ">
          <Link href={"/checkout"}>
            <button className="flex  mx-2 text-white bg-pink-500 border-0 py-1 px-2 focus:outline-none hover:bg-pink-600 rounded text-base">
              <BsFillBagCheckFill className="m-1" /> Checkout
            </button>
          </Link>
          <button
            onClick={clearCart}
            className="flex  mx-2 text-white bg-pink-500 border-0 py-1 px-2 focus:outline-none hover:bg-pink-600 rounded text-base"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
