import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";

const CategoryProduct = ({ prd }) => {
  const { title, price, imageCover, _id } = prd;
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
        <Link to={`/products/${_id}`} className="item-view-btn">
          Quick View
        </Link>
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
