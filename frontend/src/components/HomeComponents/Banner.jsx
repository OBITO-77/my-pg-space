import React from "react";
import "../../styles/HomeStyles/Banner.css";

function Banner() {
  return (
    <section className="banner">
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Raleway:wght@400&display=swap"
        rel="stylesheet"
      />

      <div className="banner-content">
        <h1>Find The Perfect PG Near Your College!</h1>
        <p>Fully Furnished, Affordable Rooms Available.</p>
      </div>
      <img src="src\assets\Banner-Bg.jpg" alt="Banner" />
    </section>
  );
}

export default Banner;
