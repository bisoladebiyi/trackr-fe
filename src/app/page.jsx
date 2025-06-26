"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.replace(ROUTES.DASHBOARD);
    } else {
      router.replace(ROUTES.LOGIN);
    }
  }, []);

  return <div></div>;
};

export default Home;
