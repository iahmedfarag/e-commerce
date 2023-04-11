import React from "react";
import slider1 from "../../assets/slider1.png";
import slider2 from "../../assets/slider2.png";
import slider3 from "../../assets/slider3.png";
import slider4 from "../../assets/slider4.png";
import slider5 from "../../assets/slider5.png";
import ramadanImg from "../../assets/ramadan.gif";
import Slider from "react-slick";
const sliderImgs = [slider1, slider2, slider3, slider4, slider5];
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
          return <img src={img} alt="img" key={index} />;
        })}
      </Slider>
    </section>
  );
};

export default MainSlider;
