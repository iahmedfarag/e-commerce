import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context.jsx";

const Product = ({ prd, inWish }) => {
  const { addWhishList, removeWhishList, whishList } = useGlobalContext();
  const { title, price, imageCover, _id } = prd;
  const titleArr = title.split(" ");
  let newTitle = "";
  if (titleArr.length > 4) {
    newTitle = titleArr.slice(0, 4).join(" ");
  } else {
    newTitle = title;
  }
  console.log(inWish);
  return (
    <>
      <article className="item">
        <div className="item-img-container">
          <img src={imageCover} className="item-img" />
          <Link to={`/products/${_id}`} className="item-view-btn">
            Quick View
          </Link>
        </div>
        <div className="item-info">
          <p className="item-name">{newTitle}</p>

          {inWish ? (
            <AiFillHeart
              className="item-wish-icon active"
              onClick={() => {
                removeWhishList(_id);
              }}
            />
          ) : (
            <AiOutlineHeart
              className="item-wish-icon"
              onClick={() => {
                addWhishList(_id);
              }}
            />
          )}

          <span className="item-price">{price} EGP</span>
        </div>
      </article>
    </>
  );
};

export default Product;
