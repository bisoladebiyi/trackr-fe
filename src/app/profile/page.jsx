"use client";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import Layout from "@/app/components/Layout/Layout";
import { ROUTES } from "@/constants/routes";
import { setUser } from "@/redux/authSlice";
import { useUpdateUserMutation } from "@/redux/features/user/userApiSlice";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    occupation: "",
    location: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [updateUser] = useUpdateUserMutation();

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace(ROUTES.LOGIN);
    }
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        phone: user.phone || "",
        email: user.email || "",
        occupation: user.occupation || "",
        location: user.location || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setIsEditing(true);
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const cancel = () => {
    setIsEditing(false);
    setFormData({
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      phone: user.phone || "",
      email: user.email || "",
      occupation: user.occupation || "",
      location: user.location || "",
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const res = await updateUser({ user: formData, uid: user.id }).unwrap();
      console.log(res);
      dispatch(setUser(res.user));
      toast.success(res.message);
    } catch (error) {
      console.log(error);
      toast.error(e?.data?.detail || e?.error || error?.error);
    }

    setIsEditing(false);
  };

  return (
    <Layout pageName="Profile">
      <form action="" onSubmit={handleSave}>
        <div className="flex flex-col w-full md:w-9/12 lg:w-1/2 gap-6">
          {Object.entries(formData).map(([key, value]) => (
            <Input
              key={key}
              name={key}
              value={value}
              label={`${key.split("_")[0]} ${key.split("_")[1] || ""}`}
              onChange={handleChange}
              type={key === "email" ? "email" : "text"}
              required={true}
            />
          ))}
        </div>

        <div className="flex justify-end space-x-4 w-full md:w-9/12 lg:w-1/2 mt-5">
          {isEditing && (
            <Button
              text={"Cancel"}
              onClick={cancel}
              className={
                "bg-white border border-primary w-fit text-primary shadow"
              }
            />
          )}
          <Button
            disabled={!isEditing}
            text={"Save"}
            type="submit"
            className={"w-fit"}
          />
        </div>
      </form>
    </Layout>
  );
};

export default Profile;
