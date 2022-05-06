import React, { useEffect } from "react";
import { useRouter } from "next/router";

const Myaccount = () => {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }, [router.query]);

  return <div className="min-h-screen">myaccount</div>;
};

export default Myaccount;
