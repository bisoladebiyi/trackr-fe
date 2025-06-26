"use client";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import Logo from "@/app/components/Logo";
import { ROUTES } from "@/constants/routes";
import { setUser } from "@/redux/authSlice";
import { useLogInMutation } from "@/redux/features/user/userApiSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [login, { isLoading, error, isError }] = useLogInMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.replace(ROUTES.DASHBOARD);
    }
  }, []);

  const onLogIn = async () => {
    await login(loginData)
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        localStorage.setItem("token", res.token);
        dispatch(setUser(res.user));
      })
      .then(() => router.push(ROUTES.DASHBOARD))
      .catch((e) => {
        toast.error(e?.data.detail || e?.error || error?.error);
      });
  };

  const isDisabled = () => {
    return !loginData.email || !loginData.password;
  };

  const onInputChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="h-full grid place-items-center relative">
      <Logo className={"absolute top-4 left-5 sm:left-10"} />
      <div className="w-10/12 sm:w-1/2 lg:w-1/3">
        <h2 className="text-blue-950 text-2xl font-semibold mb-1">Log In</h2>
        <p className="text-base text-blue-900 mb-5">Log in to your account</p>
        <form action="" className="flex flex-col gap-y-4">
          <Input
            value={loginData.email}
            name="email"
            onChange={onInputChange}
            label="Email"
            type="email"
          />
          <Input
            value={loginData.password}
            name="password"
            onChange={onInputChange}
            label="Password"
            type="password"
          />
          <Button
            disabled={isDisabled()}
            text={isLoading ? "..." : "Log In"}
            className="w-full"
            onClick={onLogIn}
          />
        </form>

        <p className="font-semibold text-blue-900 text-sm mt-8">
          Don't have an account?{" "}
          <Link href={ROUTES.SIGNUP} className="text-primary">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
