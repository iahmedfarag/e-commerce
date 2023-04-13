import React, { useEffect } from "react";
import { useGlobalContext } from "../../context.jsx";
import { Link, useNavigate } from "react-router-dom";
import women from "../../assets/women.png";
import electronics from "../../assets/electronics.png";
import men from "../../assets/men.png";
const CategorySlider = () => {
  const categories = [
    { id: 1, title: "woman", image: women },
    { id: 2, title: "men", image: men },
    { id: 3, title: "electronics", image: electronics },
  ];
  return (
    <section className="categories">
      {categories.map((cat) => {
        return (
          <article className="category">
            <Link to={`category/${cat.title}`}>
              <img src={cat.image} alt="" />
            </Link>
          </article>
        );
      })}
    </section>
  );
};

export default CategorySlider;
