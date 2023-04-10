import React from "react";
import {
  Cart,
  CategorySlider,
  Footer,
  Layout,
  MainSlider,
  Navbar,
  Products,
  SingleProduct,
  Signup,
  Signin,
  UserProfile,
} from "../../Pages.js";
import { useGlobalContext } from "../../context.jsx";
const Home = () => {
  const { homeIsLoading } = useGlobalContext();
  if (homeIsLoading.products || homeIsLoading.categorySlider) {
    return (
      <div className="loader-container">
        <span className="loader"></span>
      </div>
    );
  }
  return (
    <>
      <CategorySlider />
      <Products />
    </>
  );
};

export default Home;
