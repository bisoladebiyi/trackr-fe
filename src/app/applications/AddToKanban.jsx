import Button from "@/components/Button";
import Input from "@/components/Input";
import { IoIosClose } from "react-icons/io";
import React from "react";

const listOptions = [
  {
    value: "0",
    name: "Applied",
  },
  {
    value: "1",
    name: "Interviewing",
  },
  {
    value: "2",
    name: "Hired",
  },
  {
    value: "3",
    name: "Rejected",
  },
  {
    value: "4",
    name: "Ghosted",
  },
];

const AddToKanban = ({ listId, setShowAddModal }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative bg-white rounded-lg p-10 w-full max-w-lg shadow-lg z-50 overflow-hidden">
        <h4 className="text-gray-700 text-2xl mb-6 text-center font-semibold">
          Add new application to list
        </h4>
        <form action="" className="flex flex-col gap-y-4">
          <Input label={"Job title"} />
          <Input label={"Company name"} />
          <Input label={"Job link"} />
          <Input
            value={listId}
            label={"List"}
            type="select"
            options={listOptions}
          />
          <Button
            text={"Add to list"}
            type="button"
            className={"w-full mt-4 uppercase"}
          />
        </form>
        <button
          onClick={() => setShowAddModal(false)}
          className="absolute top-0 -right-2 bg-primary text-white p-4 cursor-pointer hover:opacity-90 transition-all rounded-b-full"
        >
          <IoIosClose size={"23"} />
        </button>
      </div>
    </div>
  );
};

export default AddToKanban;
