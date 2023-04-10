import React from "react";
import {
  Cart,
  CategorySlider,
  Footer,
  MainSlider,
  Navbar,
  Products,
  SingleProduct,
  Signup,
  Signin,
  UserProfile,
  Home,
} from "../../Pages.js";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
