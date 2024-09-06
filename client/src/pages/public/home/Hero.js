import React from "react";
import "../../../assets/css/public/style.css";
import "../../../assets/css/public/mediaquery.css"

const Hero = () => {
  return (
    <section className="hero-container">
      <div className="hero-text">
        <div className="hero-text-head">
          <p>EMPOWERING YOUR SUCCESS, SEAMLESSLY</p>
        </div>
        <h1>
          Discover <span id="underline">Valudas Tech Park</span>: Your Digital Partner
        </h1>
        <p>
          Embark On Your Digital Journey With Valudas Tech Park. We're Here To
          Simplify And Amplify Your Online Presence, Offering Tailored Solutions
          That Propel Your Success. Ready To Get Started? Simply Fill Out The
          Form Below For A Free Quote.
        </p>
        <button className="hero-container-button">Get Your Free Quote</button>
      </div>
      <div className="hero-image">
        <img
          src={require("../../../assets/images/hero-image.png")}
          alt="Hero"
        />
      </div>
    </section>
  );
};


export default Hero;
