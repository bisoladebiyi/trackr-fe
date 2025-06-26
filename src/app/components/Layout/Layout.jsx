"use client";
import React, { useEffect, useState } from "react";
import SideNav from "./SideNav";
import { MdAccountCircle } from "react-icons/md";
import { CgMenuLeftAlt } from "react-icons/cg";
import { useSelector } from "react-redux";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "next/navigation";

const Layout = ({ pageName, children }) => {
  const user = useSelector((state) => state.auth.user);
  const userName = `${user?.first_name || ""} ${user?.last_name || ""}`;
  const [showNav, setShowNav] = useState(false);

  const router = useRouter();

  const logout = () => {
    localStorage.clear();
    router.push(ROUTES.LOGIN);
  };

  return (
    <div className="h-full flex">
      <SideNav
        showNav={showNav}
        setShowNav={setShowNav}
        pageName={pageName}
        logout={logout}
      />
      <div className="w-full h-full overflow-auto">
        <nav className="p-4 bg-white border border-gray-100 w-full text-xl font-semibold text-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer">
            <button
              onClick={() => setShowNav(!showNav)}
              className="block xl:hidden"
            >
              <CgMenuLeftAlt />
            </button>
            <p>{pageName}</p>
          </div>
          <div className="flex gap-1 items-center text-sm font-medium">
            <MdAccountCircle className="text-2xl text-gray-500" />{" "}
            <p>{userName.trim() || user.email}</p>
          </div>
        </nav>
        <main className="p-4 h-lvh">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
