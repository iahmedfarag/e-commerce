import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";

const Product = ({ prd }) => {
  const { title, price, imageCover } = prd;
  const titleArr = title.split(" ");
  let newTitle = "";
  if (titleArr.length > 4) {
    newTitle = titleArr.slice(0, 4).join(" ");
  } else {
    newTitle = title;
  }
  return (
    <Link to={``} className="item">
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
    </Link>
  );
};

export default Product;
