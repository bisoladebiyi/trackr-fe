"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Layout from "@/components/Layout/Layout";
import React, { useState } from "react";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "Jane Doe",
    age: "28",
    email: "jane@example.com",
    occupation: "Frontend Developer",
    location: "Vancouver, BC",
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setIsEditing(true);
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    console.log("Saving profile", formData);
    setIsEditing(false);
  };

  return (
    <Layout pageName="Profile">
      <div className="flex flex-col w-1/2 gap-6">
        {Object.entries(formData).map(([key, value]) => (
          <Input key={key} name={key} value={value} label={key} onChange={handleChange} />
        ))}
      </div>

      <div className="flex justify-end space-x-4 w-1/2 mt-5">
        {isEditing && (
          <Button
            text={"Cancel"}
            onClick={() => setIsEditing(false)}
            className={"bg-white border border-primary w-fit text-primary shadow"}
          />
        )}
        <Button
          disabled={!isEditing}
          text={"Save"}
          onClick={() => setIsEditing(true)}
          className={"w-fit"}
        />
      </div>
    </Layout>
  );
};

export default Profile;
