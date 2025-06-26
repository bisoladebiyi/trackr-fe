"use client";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import Logo from "@/app/components/Logo";
import { ROUTES } from "@/constants/routes";
import { setUser } from "@/redux/authSlice";
import { useSignUpMutation } from "@/redux/features/user/userApiSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const Signup = () => {
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });

  const [signUp, { isLoading, error }] = useSignUpMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.replace(ROUTES.DASHBOARD);
    }
  }, []);

  const onSignUp = async () => {
    if (signupData.password !== signupData.confirm_password) {
      toast.error("Password does not match");
      return;
    }

    await signUp(signupData)
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        localStorage.setItem("token", res.token);
        dispatch(setUser(res.user));
      })
      .then(() => router.push(ROUTES.DASHBOARD))
      .catch((e) => {
        toast.error(e?.data?.detail || e?.error || error?.error);
      });
  };

  const onInputChange = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="h-full grid place-items-center relative">
      <Logo className={"absolute top-4 left-5 sm:left-10"} />
      <div className="w-10/12 sm:w-1/2 lg:w-1/3">
        <h2 className="text-blue-950 text-2xl font-semibold mb-1">Sign Up</h2>
        <p className="text-base text-blue-900 mb-5">Create an account</p>
        <form action="" className="flex flex-col gap-y-4">
          <Input
            label="Email"
            type="email"
            name="email"
            onChange={onInputChange}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            onChange={onInputChange}
          />
          <Input
            label="Confirm Password"
            type="password"
            name="confirm_password"
            onChange={onInputChange}
          />
          <Button
            text={isLoading ? "..." : "Create an account"}
            onClick={onSignUp}
            disabled={!signupData.email || !signupData.password || !signupData.confirm_password}
            className="w-full"
          />
        </form>

        <p className="font-semibold text-blue-900 text-sm mt-8">
          Already have an account?{" "}
          <Link href={ROUTES.LOGIN} className="text-primary">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
