import React from "react";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { LuFileStack } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { IoCalendarOutline, IoPeopleOutline, IoSettingsOutline } from "react-icons/io5";
import { LiaSwatchbookSolid } from "react-icons/lia";
import { FaRegFileAlt } from "react-icons/fa";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

const SideNav = ({ pageName }) => {
  return (
    <div className="w-1/6 bg-gray-50 p-3 py-5 border-r border-gray-100 h-full">
      <ul className="gap-y-3 flex flex-col">
        <Link href={ROUTES.DASHBOARD}>
          <li
            className={`flex items-center gap-2 text-gray-800 font-medium p-2 rounded-md text-sm ${
              pageName === "Dashboard"
                ? "bg-blue-50 border border-blue-100"
                : ""
            }`}
          >
            <MdOutlineSpaceDashboard className="text-xl text-primary" />{" "}
            Dashboard
          </li>
        </Link>
        <Link href={ROUTES.APPLICATIONS}>
          <li
            className={`flex items-center gap-2 text-gray-800 font-medium p-2 rounded-md text-sm ${
              pageName === "Applications"
                ? "bg-blue-50 border border-blue-100"
                : ""
            }`}
          >
            <LuFileStack className="text-xl text-primary" /> Applications
          </li>
        </Link>
        <Link href={ROUTES.PROPFILE}>
          <li
            className={`flex items-center gap-2 text-gray-800 font-medium p-2 rounded-md text-sm ${
              pageName === "Profile" ? "bg-blue-50 border border-blue-100" : ""
            }`}
          >
            <CgProfile className="text-xl text-primary" /> Profile
          </li>
        </Link>
        <Link href={ROUTES.SETTINGS}>
          {" "}
          <li
            className={`flex items-center gap-2 text-gray-800 font-medium p-2 rounded-md text-sm ${
              pageName === "Settings" ? "bg-blue-50 border border-blue-100" : ""
            }`}
          >
            <IoSettingsOutline className="text-xl text-primary" /> Settings
          </li>
        </Link>
      </ul>

      <p className="mt-12 uppercase font-semibold text-sm mb-4 text-gray-500 px-2">coming soon</p>
      <ul className="gap-y-3 flex flex-col opacity-70 cursor-not-allowed">
        <li
          className={`flex items-center gap-2 text-gray-800 font-medium p-2 rounded-md text-sm `}
        >
          <FaRegFileAlt className="text-xl text-primary" /> Resume Builder
        </li>
        <li
          className={`flex items-center gap-2 text-gray-800 font-medium p-2 rounded-md text-sm `}
        >
          <IoCalendarOutline className="text-xl text-primary" /> Calendar Integration
        </li>
        <li
          className={`flex items-center gap-2 text-gray-800 font-medium p-2 rounded-md text-sm`}
        >
          <IoPeopleOutline className="text-xl text-primary" /> Collaboration
        </li>
        <li
          className={`flex items-center gap-2 text-gray-800 font-medium p-2 rounded-md text-sm `}
        >
          <LiaSwatchbookSolid className="text-xl text-primary" /> Interview Prep Tools
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
