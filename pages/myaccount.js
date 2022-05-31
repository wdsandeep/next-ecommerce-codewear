import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
const Myaccount = () => {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }, [router.query]);

  return (
    <div className="min-h-screen">
      {" "}
      <Head>
        <title>My Account - Codeswear</title>
      </Head>
      myaccount
    </div>
  );
};

export default Myaccount;
