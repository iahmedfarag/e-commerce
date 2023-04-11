import React, { useEffect } from "react";
import { useGlobalContext } from "../../context.jsx";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
const BestSeller = () => {
  const { products } = useGlobalContext();
  const settings = {
    dots: false,
    infinite: true,
    speed: 200,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section className="best-sellers">
      <h2>Best Sellers</h2>

      <Slider {...settings}>
        {products?.map((prd, index) => {
          const { imageCover, _id, title, price } = prd;
          const titleArr = title.split(" ");
          let newTitle = "";
          if (titleArr.length > 4) {
            newTitle = titleArr.slice(0, 4).join(" ");
          } else {
            newTitle = title;
          }
          if (index >= 10) {
            return;
          } else {
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
                  <AiOutlineHeart
                    className="item-wish-icon"
                    onClick={() => {
                      addWhishList(_id);
                    }}
                  />

                  <span className="item-price">{price} EGP</span>
                </div>
              </article>
            );
          }
        })}
      </Slider>
    </section>
  );
};

export default BestSeller;
