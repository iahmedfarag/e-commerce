import React, { useEffect } from "react";
import { useGlobalContext } from "../../context.jsx";
import Product from "./Product.jsx";
const WishList = () => {
  const { isLoading, getUserWhishList, whishList } = useGlobalContext();

  useEffect(() => {
    getUserWhishList();
  }, []);

  if (isLoading) {
    return (
      <div className="loader-container">
        <span className="loader"></span>
      </div>
    );
  }
  return (
    <section className="wishlist">
      <div className="products">
        {whishList?.map((prd) => {
          let inWish = false;
          whishList?.map((whishItem) => {
            if (whishItem._id === prd._id) {
              inWish = true;
              console.log(inWish);
            }
          });
          return <Product key={prd._id} prd={prd} inWish={inWish} />;
        })}
      </div>
    </section>
  );
};

export default WishList;
