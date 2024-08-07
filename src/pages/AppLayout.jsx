import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const AppLayout = () => {
  return (
    <div className="flex flex-col">
      <div>
        <Header />
      </div>
      <div className="h-screen flex flex-col justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
