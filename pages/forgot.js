import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

const Forgot = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.name == "email") {
      setEmail(e.target.value);
    }
    if (e.target.name == "password") {
      setPassword(e.target.value);
    }
    if (e.target.name == "cpassword") {
      setCpassword(e.target.value);
    }
  };

  const sendResetEmail = async () => {
    let data = {
      email,
      sendMail: true,
    };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let res = await a.json();
    if (res.success) {
      console.log("Password reset instructions email has been sent");
    } else {
      console.log("error");
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    if (password == cpassword) {
      let data = {
        password,
        sendMail: false,
      };
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let res = await a.json();
      if (res.success) {
        console.log("Password has been changed");
      } else {
        console.log("error");
      }
    } else {
      console.log("error c != p");
    }
  };

  return (
    <div>
      <Head>
        <title>Forgot Password - Codeswear</title>
      </Head>
      <div className=" min-h-[50vh]  flex items-start justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 ">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="/codeswearcircle.png"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Forgot Password?
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or
              <Link href={"/login"}>
                <a
                  href="#"
                  className="font-medium text-pink-600 mx-2 hover:text-pink-500"
                >
                  Login
                </a>
              </Link>
            </p>
          </div>
          {router.query.token && (
            <div>
              <form className="mt-8 space-y-6" action="#" method="POST">
                <div className="rounded-md m-2 shadow-sm -space-y-px">
                  <div>
                    <label htmlFor="password" className="sr-only">
                      New Password
                    </label>
                    <input
                      onChange={handleChange}
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      autoComplete="email"
                      required
                      className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                      placeholder="New Password"
                    />
                  </div>
                  <div className="pt-3">
                    <label htmlFor="cpassword" className="sr-only">
                      Confirm New Password
                    </label>
                    <input
                      onChange={handleChange}
                      id="cpassword"
                      name="cpassword"
                      type="password"
                      autoComplete="cpassword"
                      value={cpassword}
                      required
                      className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                      placeholder="Confirm New Password"
                    />
                  </div>
                </div>

                <div>
                  <button
                    disabled={password.length < 3 || password !== cpassword}
                    onClick={resetPassword}
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:bg-pink-200"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <svg
                        className="h-5 w-5 text-pink-500 group-hover:text-pink-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    Continue
                  </button>
                  {password !== cpassword && (
                    <span className="text-red-600">Password dont match</span>
                  )}
                  {password && password == cpassword && (
                    <span className="text-green-600">Password match</span>
                  )}
                </div>
              </form>
            </div>
          )}
          {!router.query.token && (
            <form className="mt-8 space-y-6" action="#" method="POST">
              <div className="rounded-md m-2 shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    onChange={handleChange}
                    id="email-address"
                    name="email"
                    type="email"
                    value={email}
                    autoComplete="email"
                    required
                    className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={sendResetEmail}
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg
                      className="h-5 w-5 text-pink-500 group-hover:text-pink-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  Continue
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Forgot;
