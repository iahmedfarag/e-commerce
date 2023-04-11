import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context.jsx";
import { useParams } from "react-router-dom";
import {
  AiFillMinusSquare,
  AiFillPlusSquare,
  AiOutlineHeart,
} from "react-icons/ai";
import Slider from "react-slick";
import axios from "axios";

const SingleProduct = () => {
  let params = useParams();
  const [singleProduct, setSingleProduct] = useState(null);
  const {
    isLoading,
    setQuantity,
    quantity,
    addToCart,
    addWhishList,
    setIsLoading,
  } = useGlobalContext();
  // ! get single product
  const getSingleProduct = async (id) => {
    setIsLoading(true);
    try {
      let { data } = await axios.get(
        `https://route-ecommerce.onrender.com/api/v1/products/${id}`
      );
      setSingleProduct(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const changeQunatity = (x) => {
    if (x < 1 && quantity == 1) {
      return;
    }
    setQuantity(quantity + x);
  };

  // const settings = {
  //   customPaging: function (i) {
  //     return (
  //       <a className="slider-btn">
  //         <img src={singleProduct?.images[i]} />
  //       </a>
  //     );
  //   },
  //   dots: true,
  //   dotsClass: "slider-btns",
  //   infinite: true,
  //   speed: 700,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  // };

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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
        {/* <Slider {...settings}>
          {singleProduct?.images?.map((img, index) => {
            return <img src={img} key={index} alt="img" />;
          })}
        </Slider> */}
        <img src={singleProduct?.imageCover} alt="" height={500} />
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
