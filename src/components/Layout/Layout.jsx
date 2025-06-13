import React from "react";
import SideNav from "./SideNav";
import { MdAccountCircle } from "react-icons/md";

const Layout = ({ pageName, children }) => {
  return (
    <div className="h-full flex">
      <SideNav pageName={pageName} />
      <div className="w-full h-full overflow-auto">
        <nav className="p-4 bg-white border border-gray-100 w-full text-xl font-semibold text-gray-800 flex items-center justify-between">
          <p>{pageName}</p>
          <div className="flex gap-1 items-center text-sm font-medium">
            <MdAccountCircle className="text-2xl text-gray-500" /> <p>abisola.ca@gmail.com</p>
          </div>
        </nav>
        <main className="p-4 h-lvh">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
