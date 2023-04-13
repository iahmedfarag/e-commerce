import React, { useEffect } from "react";
import {
  Cart,
  CategorySlider,
  MainSlider,
  Products,
  SingleProduct,
  Signup,
  Signin,
  UserProfile,
  BestSeller,
} from "../../Pages.js";
import { useGlobalContext } from "../../context.jsx";
const Home = () => {
  const { isHomeLoading } = useGlobalContext();

  useEffect(() => {}, []);

  if (isHomeLoading.isCategoriesLoading) {
    return (
      <div className="loader-container">
        <span className="loader"></span>
      </div>
    );
  }
  return (
    <>
      <MainSlider />
      <CategorySlider />
      {/* <BestSeller /> */}
    </>
  );
};

export default Home;
