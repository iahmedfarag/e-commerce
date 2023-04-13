import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context.jsx";
import { useParams } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import axios from "axios";
import Slider from "react-slick";

const SingleProduct = () => {
  let params = useParams();
  const [singleProduct, setSingleProduct] = useState(null);
  const [inWish, setInWish] = useState(false);
  const {
    isLoading,
    setQuantity,
    quantity,
    addToCart,
    setIsLoading,
    addWhishList,
    removeWhishList,
  } = useGlobalContext();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
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
          {singleProduct?.images.map((img) => {
            return <img src={img} height={500} />;
          })}
        </Slider>
        {/* <img src={singleProduct?.imageCover} alt="" height={500} /> */}
      </div>

      <div className="product-info">
        <h1 className="product-title">{singleProduct?.title}</h1>
        <p className="product-brand">{singleProduct?.brand?.name}</p>
        <p className="product-rate">
          4.8 <span>(120 reviews)</span>
        </p>
        <p className="product-price">{singleProduct?.price} EGP</p>
        <p className="product-desc">{singleProduct?.description}</p>
        <ul>
          <li>Lorem ipsum dolor, sit amet consectetur adipisicing elit?</li>
          <li>Lorem ipsum dolor, sit amet consectetur adipisicing elit?</li>
          <li>Lorem ipsum dolor, sit amet consectetur adipisicing elit?</li>
        </ul>
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
        </div>
      </div>
    </article>
  );
};

export default SingleProduct;
