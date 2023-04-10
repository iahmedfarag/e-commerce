import React from "react";
import { useGlobalContext } from "../../context.jsx";
import CategoryProduct from "./CategoryProduct.jsx";

const CategoryProducts = () => {
  const { isLoading, categoryProducts } = useGlobalContext();

  if (isLoading) {
    return (
      <div className="loader-container">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <section className="products">
      {categoryProducts?.length < 1 ? (
        <h1>no products avaiable</h1>
      ) : (
        categoryProducts?.map((prd) => {
          return <CategoryProduct key={prd._id} prd={prd} />;
        })
      )}
    </section>
  );
};

export default CategoryProducts;
