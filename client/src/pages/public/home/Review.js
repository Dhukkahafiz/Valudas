<<<<<<< HEAD
import React from 'react'

const Review = () => {
    return (
        <>
            <section class="review-section">

                <div class="section-review-header">
                    <div class="text-head">
                        <p>OUR CLIENTS SPEAK, AND THEY SPEAK HIGHLY</p>
                    </div>
                    <h2><span id="border-header-text">Great Reviews</span> with Positive Feedback</h2>
                    <p> Experience The Satisfaction Of Our Clients Firsthand. With 100% Of Them Awarding Us Five Star Ratings On
                        Google And Every Online Platform, Our Track Record Speaks Volumes About Our Commitment To Excellence.
                    </p>
                </div>

                <div class="review-text-contents">

                    <div class="review-text">
                        <div class="review-content-icon">
                            <span class="quote-icon">
                                <i class="fa-solid fa-quote-left"></i>
                            </span>
                            <span class="star-icon">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                            </span>
                        </div>
                        <p>I've Worked With Valuda's On A Number Of Project And Could Not Recommend Them Enough. Extremely
                            Professional And Pleasant Staff Who Always Deliver Beyond My Expectations.</p>
                        <h3>Shradha Gaikwad</h3>
                    </div>

                    <div class="review-text">
                        <div class="review-content-icon">
                            <span class="quote-icon">
                                <i class="fa-solid fa-quote-left"></i>
                            </span>
                            <span class="star-icon">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                            </span>
                        </div>
                        <p>This Is Really Best Company As Well. Great Communication - Timely Delivered. I Am Using His Service
                            For All My Opencart Issue. Thank You Once Again</p>
                        <h3>KD Hamim</h3>
                    </div>

                    <div class="review-text">
                        <div class="review-content-icon">
                            <span class="quote-icon">
                                <i class="fa-solid fa-quote-left"></i>
                            </span>
                            <span class="star-icon">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                            </span>
                        </div>
                        <p>One Of The Best Services I Had Ever Received. My First And Last Stop To Get All IT Services. Very
                            Friendly And Trustworthy
                        </p>
                        <h3>Muqarab Hussain</h3>
                    </div>
                </div>
                <div class="slider-icon-review-inner">
                    <i class="fa-solid fa-chevron-left"></i>
                    <img src={require("../../../assets/images/icons8-vertical-line-25.png")} />
                    <i class="fa-solid fa-chevron-right"></i>
                </div>
            </section>


            <div class="mid-vision-section">
                <div class="mid-vision-text">
                    <h3>Let's Bring Your Vision To Life</h3>
                    <p>Reach Out Today To Discuss Your Project Requirements And Discover How We Can Turn Your Ideas Into
                        Reality.</p>
                </div>
                <button class="mid-vision-button">
                    Let's Get Started
                </button>
            </div>
        </>
    )
}

export default Review
=======
import React, { useState, useEffect } from "react";
import "../../../assets/css/public/Review.css";
import star from "../../../assets/images/star.png";

function Review() {
  const reviewSlider = [
    {
      text: "I've worked with Valuda's on a number of project and could not recommend them enough. Extremely professional and pleasant staff who always deliver beyond my expectations.",
      name: "Shradha Gaikwad",
    },
    {
      text: "This is really best company as well. Great communication - timely delivered. I am using his service for all my opencart issue. Thank you once again",
      name: "KD Hamim",
    },
    {
      text: "One of the best services i had ever received. my first and last stop to get all IT services. Very friendly and trustworthy",
      name: "Muqarab Hussain",
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  const handleNext = () => {
    setActiveSlide((prevIndex) => (prevIndex + 1) % reviewSlider.length);
  };

  const handlePrevious = () => {
    setActiveSlide(
      (prevIndex) => (prevIndex - 1 + reviewSlider.length) % reviewSlider.length
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="review_first_page">
        <div className="empo_pera">
          <span>Our Clients Speak, and They Speak Highly</span>
        </div>

        <div className="service_header">
          <h1>
            <span>Great Reviews</span> with Positive Feedback
          </h1>
        </div>

        <div className="service_pera">
          <p>
            Experience the satisfaction of our clients firsthand. With 100% of
            them awarding us Five Star Ratings on Google and every online
            platform, our track record speaks volumes about our commitment to
            excellence.
          </p>
        </div>
      </div>

      <div className="review_page">
        {reviewSlider
          .slice(
            activeSlide,
            activeSlide +
            (window.innerWidth <= 768
              ? window.innerWidth <= 426
                ? 1
                : 2
              : 3)
          )
          .concat(
            activeSlide +
              (window.innerWidth <= 768
                ? window.innerWidth <= 426
                  ? 1
                  : 2
                : 3) >
              reviewSlider.length
              ? reviewSlider.slice(
                0,
                (activeSlide +
                  (window.innerWidth <= 768
                    ? window.innerWidth <= 426
                      ? 1
                      : 2
                    : 3)) %
                reviewSlider.length
              )
              : []
          )
          .map((review, index) => (
            <div className="review_box" key={index}>
              <div className="review_icon">
                <i className="fa-solid fa-quote-left"></i>
                <img src={star} alt="star" />
              </div>
              <p>{review.text}</p>
              <h5>{review.name}</h5>
            </div>
          ))}
      </div>

      <div className="review_box_icon">
        <div className="review_arrow" onClick={handlePrevious}>
          <i className="fa-solid fa-chevron-left"></i>
        </div>
        <div className="line">|</div>
        <div className="review_arrow" onClick={handleNext}>
          <i className="fa-solid fa-chevron-right"></i>
        </div>
      </div>
    </>
  );
}

export default Review;
>>>>>>> 7f0bd4d54ae5eacb9abb139c7f27365c3f6c7442
