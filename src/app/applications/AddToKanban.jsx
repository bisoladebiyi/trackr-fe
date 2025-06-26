import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import { IoIosClose } from "react-icons/io";
import React from "react";
import { statusOptions } from "@/constants/status";

const AddToKanban = ({
  onSubmit,
  setShowAddModal,
  statusId,
  onAppChange,
  onListChange,
  application,
  isEditing,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative bg-white rounded-lg p-7 md:p-10 w-11/12 md:w-full max-w-lg shadow-lg z-50 overflow-hidden">
        <h4 className="text-gray-700 text-xl md:text-2xl mb-6 text-center font-semibold">
          {isEditing ? "Edit Application" : "Add new application to list"}
        </h4>
        <form action="" onSubmit={onSubmit} className="flex flex-col gap-y-4">
          <Input
            onChange={onAppChange}
            name="job_name"
            value={application.job_name}
            label={"Job title"}
            required
          />
          <Input
            onChange={onAppChange}
            name="company_name"
            value={application.company_name}
            label={"Company name"}
            required
          />
          <Input
            onChange={onAppChange}
            name="link"
            value={application.link}
            label={"Job link"}
          />
          <Input
            onChange={onAppChange}
            name="salary"
            value={application.salary}
            label={"Salary"}
          />
          <Input
            onChange={onListChange}
            value={statusId}
            name="status"
            label={"List"}
            type="select"
            options={statusOptions}
            required
          />
          <Button
            text={isEditing ? "Edit Application" : "Add to list"}
            type="submit"
            className={"w-full mt-4 uppercase"}
          />
        </form>
        <button
          onClick={() => setShowAddModal(false)}
          className="absolute top-0 -right-2 bg-primary text-white p-3 md:p-4 cursor-pointer hover:opacity-90 transition-all rounded-b-full"
        >
          <IoIosClose size={"23"} />
        </button>
      </div>
    </div>
  );
};

export default AddToKanban;
