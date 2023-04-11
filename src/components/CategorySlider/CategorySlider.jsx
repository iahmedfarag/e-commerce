import React, { useEffect } from "react";
import Slider from "react-slick";
import { useGlobalContext } from "../../context.jsx";
import { Link, useNavigate } from "react-router-dom";

const CategorySlider = () => {
  const { categories } = useGlobalContext();
  const settings = {
    dots: false,
    infinite: true,
    speed: 200,
    slidesToShow: 6,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  return (
    <section className="categories-slider">
      <h2>Categories</h2>
      <Slider {...settings}>
        {categories?.map((cat) => {
          const { image, name, _id, slug } = cat;
          return (
            <div className="category" key={_id}>
              <img src={image} alt={name} className="category-img" />
              <Link to={`category/${slug}`}>
                <p className="category-name">{name}</p>
              </Link>
            </div>
          );
        })}
      </Slider>
    </section>
  );
};

export default CategorySlider;
