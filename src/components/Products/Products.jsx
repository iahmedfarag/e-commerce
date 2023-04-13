import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context.jsx";
import Product from "./Product.jsx";
const Products = () => {
  const { products, getProducts, isLoading, getUserWhishList, whishList } =
    useGlobalContext();

  useEffect(() => {
    getUserWhishList();
    getProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="loader-container">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <section className="products">
      {products?.map((prd) => {
        let inWish = false;
        whishList?.map((whishItem) => {
          if (whishItem._id === prd._id) {
            inWish = true;
            console.log(inWish);
          }
        });
        return <Product key={prd._id} prd={prd} inWish={inWish} />;
      })}
    </section>
  );
};

export default Products;
