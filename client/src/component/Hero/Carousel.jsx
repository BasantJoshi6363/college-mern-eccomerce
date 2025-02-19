import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
import car1 from "../../assets/carousel/caro1.jpg"
import car2 from "../../assets/carousel/car2.png"
import car3 from "../../assets/carousel/car3.png"

function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay : true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div className="slider-container h-[270px] w-[80vw] px-6 py-2">
      <Slider {...settings}>
       <div className="h-64 w-full">
       <img className="h-[100%] w-[100%] object-fill" src={car1} alt="" />
       </div>
       <div className="h-64 w-full">
      <img src={car2} className="h-[100%] w-[100%] object-cover" alt="" />
       </div>
       <div className="h-64 w-full">
       <img src={car3} className="h-[100%] w-[100%]" alt="" />

       </div>
      </Slider>
    </div>
  );
}

export default SimpleSlider;
