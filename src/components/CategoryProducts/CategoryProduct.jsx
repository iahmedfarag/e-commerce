import React from "react";
import { AiOutlineHeart } from "react-icons/ai";

const CategoryProduct = ({ prd }) => {
  const { title, price, imageCover } = prd;
  const titleArr = title.split(" ");
  let newTitle = "";
  if (titleArr.length > 4) {
    newTitle = titleArr.slice(0, 4).join(" ");
  } else {
    newTitle = title;
  }
  return (
    <article className="item">
      <div className="item-img-container">
        <img src={imageCover} className="item-img" />
        <a href="" className="item-view-btn">
          Quick View
        </a>
      </div>
      <div className="item-info">
        <p className="item-name">{newTitle}</p>
        <div className="item-wish-icon">
          <AiOutlineHeart />
        </div>
        <span className="item-price">{price} EGP</span>
      </div>
    </article>
  );
};

export default CategoryProduct;