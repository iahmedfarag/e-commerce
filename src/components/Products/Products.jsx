import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context.jsx";
import Product from "./Product.jsx";
const Products = () => {
  const { products, getProducts, isLoading } = useGlobalContext();

  useEffect(() => {
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
        return <Product key={prd._id} prd={prd} />;
      })}
    </section>
  );
};

export default Products;
