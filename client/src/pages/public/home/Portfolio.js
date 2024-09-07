import React, { useState } from 'react';
import '../../../assets/css/public/Our.css';
import noDataImage from '../../../assets/images/oops.png';

const Portfolio = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    { src: require('../../../assets/images/slider-image1.png'), title: 'Proud Punch', description: 'Insight Experience Offers A Suite Of Experiential Business Simulation And Leadership Development And Developing New Leaders.' },
    { src: require('../../../assets/images/slider-image2.png'), title: 'WeedMat', description: 'Insight Experience Offers A Suite Of Experiential Business Simulation And Leadership Development And Developing New Leaders.' },
    // Add more images as needed
    { src: require('../../../assets/images/slider-image1.png'), title: 'hello', description: 'Insight Experience Offers A Suite Of Experiential Business Simulation And Leadership Development And Developing New Leaders.' },

  ];

  const   prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  console.log(images[currentIndex].src)

  return (
    <>
      <section className="our-work-section">
        <div className="section-header">
          <div className="text-head">
            <p>TRANSFORMING IDEAS INTO REALITY</p>
          </div>
          <h2><span id="border-header-text">Our Work</span>: Showcasing Excellence</h2>
          <p>Experience The Satisfaction Of Our Clients Firsthand. With 100% Of Them Awarding Us Five Star Ratings On
            Google And Every Online Platform, Our Track Record Speaks Volumes About Our Commitment To Excellence.
          </p>
        </div>

        <div className="our-work-content">
          <div className="our-work-content-text">
            {/* Existing content */}
            <div className="cms-content">
              <details className="cms-details">
                <summary className="cms-content-header">
                  <img src={require("../../../assets/images/CMS logo.png")} alt="CMS Logo" />
                  <div className="cms-content-head-text-icon">
                    <p>CMS</p>
                    <i className="fa-solid fa-angle-up"></i>
                  </div>
                </summary>

                <div className="cms-content-dropdown-text">
                  <span className="green-text">
                    <p>Hubspot CMS</p>
                    <i className="fa-solid fa-arrow-right" style={{ color: " #52a01f" }}></i>
                  </span>
                  <p>Wordpress</p>
                  <p>OpenCart</p>
                </div>
              </details>
            </div>

            <div className="cms-content">
              <details className="cms-details">
                <summary className="cms-content-header">
                  <img src={require("../../../assets/images/vs studio logo.png")} alt="CMS Logo" />
                  <div className="cms-content-head-text-icon">
                    <p>Custom Web Development</p>
                    <i className="fa-solid fa-angle-up"></i>
                  </div>
                </summary>

                <div className="cms-content-dropdown-text">
                  <span className="green-text">
                    <p>Hubspot CMS</p>
                    <i className="fa-solid fa-arrow-right" style={{ color: " #52a01f" }}></i>
                  </span>
                  <p>Wordpress</p>
                  <p>OpenCart</p>
                </div>
              </details>
            </div>

            <div className="cms-content">
              <details className="cms-details">
                <summary className="cms-content-header">
                  <img src={require("../../../assets/images/Hubspot logo.png")} alt="CMS Logo" />
                  <div className="cms-content-head-text-icon">
                    <p>HubSpot Development</p>
                    <i className="fa-solid fa-angle-up"></i>
                  </div>
                </summary>

                <div className="cms-content-dropdown-text">
                  <span className="green-text">
                    <p>Hubspot CMS</p>
                    <i className="fa-solid fa-arrow-right" style={{ color: " #52a01f" }}></i>
                  </span>
                  <p>Wordpress</p>
                  <p>OpenCart</p>
                </div>
              </details>
            </div>

            <div className="cms-content">
              <details className="cms-details">
                <summary className="cms-content-header">
                  <i className="fa-brands fa-android" style={{ color: "#05f649" }}></i>
                  <div className="cms-content-head-text-icon">
                    <p>Mobile Application</p>
                    <i className="fa-solid fa-angle-up"></i>
                  </div>
                </summary>

                <div className="cms-content-dropdown-text">
                  <span className="green-text">
                    <p>Hubspot CMS</p>
                    <i className="fa-solid fa-arrow-right" style={{ color: " #52a01f" }}></i>
                  </span>
                  <p>Wordpress</p>
                  <p>OpenCart</p>
                </div>
              </details>
            </div>
          </div>

          <div className="our-work-content-slider">
            <div className="slider-content">
              <button className="prev" onClick={prevSlide}>
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              <button className="next" onClick={nextSlide}>
                <i className="fa-solid fa-arrow-right"></i>
              </button>
              <div className="slider-track">

                <div className="slider-item" >
                  <img src={images[currentIndex === 0 ? images.length - 1 : currentIndex - 1].src} />
                  <h4>{images[currentIndex === 0 ? images.length - 1 : currentIndex - 1].title}</h4>
                  <p>{images[currentIndex === 0 ? images.length - 1 : currentIndex - 1].description}</p>
                </div>
                <div className="slider-item" >
                <img src={images[currentIndex].src} />
                <h4>{images[currentIndex].title}</h4>
                <p>{images[currentIndex].description}</p>
              </div>

              </div>
            </div>
          </div>
        </div>

        <div className="inquiry-section">
          <h5>Get Excellent Service And Support And Grow Your Business Online With Valuda’s</h5>
          <button className="inquiry-button">Inquiry Now</button>
        </div>
      </section>
    </>
  );
};

export default Portfolio;
