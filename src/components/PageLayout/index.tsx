import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

function PageLayout() {
  return (
    <>
      <Header/>
      <div className="wrapper">
        <Outlet />
      </div>
    </>
  );
}

export default PageLayout;
