import React, { useEffect } from "react";
import { useGlobalContext } from "../../context.jsx";
import CategoryProduct from "./CategoryProduct.jsx";
import { useParams } from "react-router-dom";
import axios from "axios";

const CategoryProducts = () => {
  let params = useParams();
  const { isLoading, categoryProducts, setIsLoading, setCategoryProducts } =
    useGlobalContext();

  const getCategoryProducts = async (slug) => {
    setIsLoading(true);
    try {
      let { data } = await axios.get(
        "https://route-ecommerce.onrender.com/api/v1/products"
      );
      let catProductsArr = data.data.filter(
        (prd) => prd.category.slug === slug
      );
      setCategoryProducts(catProductsArr);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getCategoryProducts(params.slug);
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
