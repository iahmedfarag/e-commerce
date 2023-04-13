import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context.jsx";
import CategoryProduct from "./CategoryProduct.jsx";
import { useParams } from "react-router-dom";
import axios from "axios";

const CategoryProducts = () => {
  const { isLoading, setIsLoading, whishList } = useGlobalContext();
  const [categoryProducts, setCategoryProducts] = useState(null);
  let params = useParams();

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
          let inWish = false;
          whishList?.map((whishItem) => {
            if (whishItem._id === prd._id) {
              inWish = true;
              console.log(inWish);
            }
          });
          return <CategoryProduct key={prd._id} prd={prd} inWish={inWish} />;
        })
      )}
    </section>
  );
};

export default CategoryProducts;
