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

