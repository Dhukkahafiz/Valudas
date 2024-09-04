import React from "react";
import "../../../assets/css/public/style.css";
import "../../../assets/css/public/mediaquery.css";

function Hero() {
  return (
    <>
      <section class="au-hero-container">
        <div class=" au-hero-text">
          <div class="au-hero-text-head">
            <p>ABOUT US</p>
          </div>
          <h1>Empowering Business Transformation</h1>
          <p>
            At Valuda’s, We Help Organizations Of All Sizes Embark On Their
            Journey Of Business And Technology Transformation, Fast-Tracking
            Their Way To Success.
          </p>
        </div>
        <div class="au-hero-image">
          <img
            src={require("../../../assets/images/hero-image(about-us).png")}
          />
        </div>

        <div class="hero-image-bottom-text">
          <div class="our-projects">
            <h2>200+</h2>
            <p>Global Projects</p>
            Successful Projects Delivered Worldwide.
          </div>
          <div class="our-projects">
            <h2>95%</h2>
            <p>Client Satisfaction</p>
            Repeat Business Rate.
          </div>
          <div class="our-projects">
            <h2>15+ Years</h2>
            <p>Industry Experience</p>
            In The Technology And Development Industry.
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
