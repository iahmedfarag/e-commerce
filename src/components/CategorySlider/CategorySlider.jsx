import React from "react";
import Slider from "react-slick";
import { useGlobalContext } from "../../context.jsx";
import { Link, useNavigate } from "react-router-dom";

const CategorySlider = () => {
  const { setIsLoading, categories, setCategoryProducts, getCategoryProducts } =
    useGlobalContext();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 5,
  };

  return (
    <section className="categories-slider">
      <Slider {...settings}>
        {categories?.map((cat) => {
          const { image, name, _id, slug } = cat;
          return (
            <Link to={`category/${slug}`} className="category" key={_id}>
              <img src={image} alt={name} className="category-img" />
              <p className="category-name">{name}</p>
            </Link>
          );
        })}
      </Slider>
    </section>
  );
};

export default CategorySlider;
