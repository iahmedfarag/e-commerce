import React, { useState } from "react";
import { useGlobalContext } from "../../context.jsx";
import Product from "./Product.jsx";
const Products = () => {
  const { products } = useGlobalContext();

  return (
    <section className="products">
      {products?.map((prd) => {
        return <Product key={prd._id} prd={prd} />;
      })}
    </section>
  );
};

export default Products;
