"use client";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import Layout from "@/app/components/Layout/Layout";
import { ROUTES } from "@/constants/routes";
import {
  useDeleteAccountMutation,
  useUpdatePasswordMutation,
} from "@/redux/features/user/userApiSlice";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Settings = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteAccount, { error: accountError }] = useDeleteAccountMutation();
  const [updatePassword, { error: passwordError }] =
    useUpdatePasswordMutation();
  const user = useSelector((state) => state.auth.user);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace(ROUTES.LOGIN);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updatePassword({
        current_password: passwordData.currentPassword,
        new_password: passwordData.newPassword,
        uid: user.id,
      }).unwrap();
      toast.success(res.message);
      logout();
    } catch (e) {
      toast.error(e?.data?.detail || e?.error || passwordError?.error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const res = await deleteAccount(user.id).unwrap();
      toast.success(res.message);
      logout();
    } catch (e) {
      toast.error(e?.data?.detail || e?.error || accountError?.error);
    }
  };

  const logout = () => {
    localStorage.clear();
    router.push(ROUTES.LOGIN);
  };

  return (
    <Layout pageName={"Settings"}>
      <div className="max-w-4xl">
        <form onSubmit={handlePasswordSubmit} className="space-y-6 mb-10">
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              🔐 Change Password
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label={"Current Password"}
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handleChange}
                required
              />
              <Input
                label={"New Password"}
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handleChange}
                required
              />
            </div>
            <Button
              text={"Update Password"}
              className={"mt-5"}
              disabled={
                !passwordData.newPassword || !passwordData.currentPassword
              }
              type="submit"
            />
          </div>
        </form>

        <div className="border-t border-gray-100 pt-8">
          <h2 className="text-xl font-semibold text-red-400 mb-2">
            Delete Account
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            This action is irreversible. All your data will be permanently
            removed.
          </p>

          {deleteConfirm ? (
            <div className="flex items-center gap-4">
              <Button
                text={"Confirm Delete"}
                onClick={handleDeleteAccount}
                className={"bg-red-400 hover:bg-red-500 transition"}
              />
              <Button
                text={"Cancel"}
                onClick={() => setDeleteConfirm(false)}
                className={
                  "bg-white border border-primary w-fit text-primary shadow"
                }
              />
            </div>
          ) : (
            <button
              onClick={() => setDeleteConfirm(true)}
              className="text-red-400 underline hover:text-red-500 text-sm cursor-pointer"
            >
              Delete My Account
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
