<<<<<<< HEAD
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
=======
import React, { useState, useEffect, useRef } from "react";
import "../../../assets/css/public/hero.css";
import { useValudasData } from "../../../context/Storage";

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const slideTrackRef = useRef(null);
  const { slider } = useValudasData();

  useEffect(() => {
    const autoSlide = () => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    };

    const intervalId = setInterval(autoSlide, 2000);

    return () => clearInterval(intervalId);
  }, [slider.length]);

  useEffect(() => {
    const slideTrack = slideTrackRef.current;
    if (!slideTrack) return;

    const totalSlides = slider.length;
    const firstSlide = slideTrack.children[0];
    if (!firstSlide) return;

    const slideWidth = firstSlide.offsetWidth;

    if (currentIndex === totalSlides) {
      slideTrack.style.transition = "none";
      slideTrack.style.transform = `translateX(0)`;
      setTimeout(() => {
        setIsTransitioning(true);
        setCurrentIndex(1);
      }, -1);
    } else {
      slideTrack.style.transition = isTransitioning
        ? "transform 0.5s linear"
        : "none";
      slideTrack.style.transform = `translateX(${
        -currentIndex * slideWidth
      }px)`;
    }
  }, [currentIndex, isTransitioning, slider.length]);

  return (
    <div className="hero">
      <div className="hero_page">
        <span id="empowering">Empowering Your Success, Seamlessly</span>
        <h1>
          Discover <span>Valudas Tech Park</span>: Your Digital Partner
        </h1>
        <p>
          Embark on your digital journey with Valudas Tech Park. We're here to
          simplify and amplify your online presence, offering tailored solutions
          that propel your success. Ready to get started? Simply fill out the
          form below for a free quote.
        </p>
        <button>Get Your Free Quote</button>
      </div>

      <div className="hero_second">
        <div className="slider">
          <div className="slide-track" ref={slideTrackRef}>
            {slider.concat(slider).map((slide, index) => (
              <div className="slide" key={index}>
                <img
                  src={`/upload/${slide.image}`}
                  alt="Testimonial user"
                  style={{ width: "70%" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
>>>>>>> 7f0bd4d54ae5eacb9abb139c7f27365c3f6c7442

export default Hero;
