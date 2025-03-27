// ImageSlider.jsx
import React from "react";
import Slider from "react-slick";
import "../../styles/PGDetailsStyles/ImageSlider.css";
const ImageSlider = ({ images }) => {
  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Infinite loop
    speed: 500, // Transition speed
    slidesToShow: 1, // Show one slide at a time
    slidesToScroll: 1, // Scroll one slide at a time
    autoplay: true, // Autoplay slider
    autoplaySpeed: 3000, // Time in ms for autoplay
    arrows: true, // Enable arrows for navigation
  };

  return (
    <div className="image-slider">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`PG Image ${index + 1}`}
              className="slider-image"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
