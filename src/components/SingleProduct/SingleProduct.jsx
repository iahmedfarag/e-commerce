import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context.jsx";
import { useParams } from "react-router-dom";
import {
  AiFillMinusSquare,
  AiFillPlusSquare,
  AiOutlineHeart,
} from "react-icons/ai";
import Slider from "react-slick";

const SingleProduct = () => {
  let params = useParams();
  const {
    isLoading,
    getSingleProduct,
    singleProduct,
    setQuantity,
    quantity,
    addToCart,
    addWhishList,
  } = useGlobalContext();

  const changeQunatity = (x) => {
    if (x < 1 && quantity == 1) {
      return;
    }
    setQuantity(quantity + x);
  };

  const settings = {
    customPaging: function (i) {
      return (
        <a className="slider-btn">
          <img src={singleProduct?.images[i]} />
        </a>
      );
    },
    dots: true,
    dotsClass: "slider-btns",
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // const settings = {
  //   customPaging: function (i) {
  //     return (
  //       <a>
  //         <img src={singleProduct?.images[i]} />
  //       </a>
  //     );
  //   },
  //   dots: true,
  //   dotsClass: "slick-dots slick-thumb",
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  // };

  useEffect(() => {
    getSingleProduct(params.id);
  }, []);

  if (isLoading) {
    return (
      <div className="loader-container">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <article className="single-product">
      <div className="product-slider">
        <Slider {...settings}>
          {singleProduct?.images.map((img, index) => {
            return <img src={img} key={index} />;
          })}
        </Slider>
      </div>
      <div className="product-info">
        <h1 className="product-title">{singleProduct?.title}</h1>
        <p className="product-brand">{singleProduct?.brand?.name}</p>
        <p className="product-rate">
          4.8 <span>(120 reviews)</span>
        </p>
        <p className="product-price">{singleProduct?.price} EGP</p>
        <p className="product-desc">{singleProduct?.description}</p>

        <div className="add-section">
          <div className="quantity">
            <span>Quantity:</span>
            <div className="circle">
              <div onClick={() => changeQunatity(-1)} className="minus">
                -
              </div>
              <p className="num">{quantity}</p>
              <div onClick={() => changeQunatity(1)} className="plus">
                +
              </div>
            </div>
          </div>
          <button
            className="add-to-cart"
            onClick={() => {
              addToCart(singleProduct?._id);
            }}
          >
            ADD TO CART
          </button>
          <AiOutlineHeart
            className="item-wish-icon"
            onClick={() => {
              addWhishList(singleProduct?._id);
            }}
          />
        </div>
      </div>
    </article>
  );
};

export default SingleProduct;
