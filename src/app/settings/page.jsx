"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Layout from "@/components/Layout/Layout";
import React, { useState } from "react";

const Settings = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match.");
      return;
    }

    console.log("Change password:", passwordData);
    alert("Password changed (dummy alert)");
  };

  const handleDeleteAccount = () => {
    console.log("Account deleted");
    alert("Account deleted (dummy alert)");
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
            <Button text={"Update Password"} className={"mt-5"} disabled={!passwordData.newPassword || !passwordData.confirmPassword} />
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
                <Button text={"Confirm Delete"} onClick={handleDeleteAccount} className={"bg-red-400 hover:bg-red-500 transition"}/>
                <Button text={"Cancel"} onClick={() => setDeleteConfirm(false)} className={"bg-white border border-primary w-fit text-primary shadow"}/>
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
