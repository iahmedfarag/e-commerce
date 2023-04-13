import React from "react";
import slider2 from "../../assets/jumia1.jpg";
import slider3 from "../../assets/jumia2.png";
import ramadanImg from "../../assets/ramadan.gif";
import Slider from "react-slick";
const sliderImgs = [slider2, slider3];
const MainSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };
  return (
    <section className="main-slider">
      <img src={ramadanImg} />
      <Slider {...settings} style={{ marginTop: "-4px" }}>
        {sliderImgs.map((img, index) => {
          return (
            <img
              src={img}
              alt="img"
              key={index}
              height={500}
              className="slider-img"
            />
          );
        })}
      </Slider>
    </section>
  );
};

export default MainSlider;
