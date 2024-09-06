<<<<<<< HEAD
import React from 'react'

const Portfolio = () => {
    return (
        <>
            <section class="our-work-section">
                <div class="section-header">
                    <div class="text-head">
                        <p>TRANSFORMING IDEAS INTO REALITY</p>
                    </div>
                    <h2><span id="border-header-text">Our Work</span>: Showcasing Excellence</h2>
                    <p> Experience The Satisfaction Of Our Clients Firsthand. With 100% Of Them Awarding Us Five Star Ratings On
                        Google And Every Online Platform, Our Track Record Speaks Volumes About Our Commitment To Excellence.
                    </p>
                </div>

                <div class="our-work-content">

                    <div class="our-work-content-text">
                        <div class="cms-content">
                            <details class="cms-details">
                                <summary class="cms-content-header">
                                    <img src={require("../../../assets/images/CMS logo.png")} alt="CMS Logo" />
                                    <div class="cms-content-head-text-icon">
                                        <p>CMS</p>
                                        <i class="fa-solid fa-angle-up"></i>
                                    </div>
                                </summary>

                                <div class="cms-content-dropdown-text">
                                    <span class="green-text">
                                        <p>Hubspot CMS</p>
                                        <i class="fa-solid fa-arrow-right" style={{ color: " #52a01f" }}></i>
                                    </span>
                                    <p>Wordpress</p>
                                    <p>OpenCart</p>
                                </div>
                            </details>
                        </div>

                        <div class="cms-content">
                            <details class="cms-details">
                                <summary class="cms-content-header">
                                    <img src={require("../../../assets/images/vs studio logo.png")} alt="CMS Logo" />
                                    <div class="cms-content-head-text-icon">
                                        <p>Custom Web Development</p>
                                        <i class="fa-solid fa-angle-up"></i>
                                    </div>
                                </summary>

                                <div class="cms-content-dropdown-text">
                                    <span class="green-text">
                                        <p>Hubspot CMS</p>
                                        <i class="fa-solid fa-arrow-right" style={{ color: " #52a01f" }}></i>
                                    </span>
                                    <p>Wordpress</p>
                                    <p>OpenCart</p>
                                </div>
                            </details>
                        </div>


                        <div class="cms-content">
                            <details class="cms-details">
                                <summary class="cms-content-header">
                                    <img src={require("../../../assets/images/Hubspot logo.png")} alt="CMS Logo" />
                                    <div class="cms-content-head-text-icon">
                                        <p>HubSpot Development</p>
                                        <i class="fa-solid fa-angle-up"></i>
                                    </div>
                                </summary>

                                <div class="cms-content-dropdown-text">
                                    <span class="green-text">
                                        <p>Hubspot CMS</p>
                                        <i class="fa-solid fa-arrow-right" style={{ color: " #52a01f" }}></i>
                                    </span>
                                    <p>Wordpress</p>
                                    <p>OpenCart</p>
                                </div>
                            </details>
                        </div>


                        <div class="cms-content">
                            <details class="cms-details">
                                <summary class="cms-content-header">
                                    <i class="fa-brands fa-android" style={{ color: "#05f649" }}></i>
                                    <div class="cms-content-head-text-icon">
                                        <p>Mobile Application</p>
                                        <i class="fa-solid fa-angle-up"></i>
                                    </div>
                                </summary>

                                <div class="cms-content-dropdown-text">
                                    <span class="green-text">
                                        <p>Hubspot CMS</p>
                                        <i class="fa-solid fa-arrow-right" style={{ color: " #52a01f" }}></i>
                                    </span>
                                    <p>Wordpress</p>
                                    <p>OpenCart</p>
                                </div>
                            </details>
                        </div>





                        {/*
                            
                        <div class="custom-web-dev-section">
                            <div class="custom-web-dev-section-inner-text">
                                <img src={require("../../../assets/images/vs studio logo.png")} />
                                <p>Custom Web Development</p>
                            </div>
                            <i class="fa-solid fa-angle-down"></i>
                        </div>

                        <div class="custom-web-dev-section">
                            <div class="custom-web-dev-section-inner-text">
                                <img src={require("../../../assets/images/Hubspot logo.png")} />
                                <p>HubSpot Development</p>
                            </div>
                            <i class="fa-solid fa-angle-down"></i>
                        </div>

                        <div class="custom-web-dev-section">
                            <div class="custom-web-dev-section-inner-text">
                                <i class="fa-brands fa-android" style={{ color: "#05f649" }}></i>
                                <p>Mobile Application</p>
                            </div>
                            <i class="fa-solid fa-angle-down"></i>
                        </div>
 */}
                    </div>

                    <div class="our-work-content-slider">
                        <div class="slider-content1">
                            <img src={require("../../../assets/images/slider-image1.png")} />
                            <h4>Proud Punch</h4>
                            <p>Insight Experience Offers A Suite Of Experiential Business Simulation And Leadership Development
                                And Developing New Leaders.</p>
                        </div>
                        <div class="slider-content2">
                            <img src={require("../../../assets/images/slider-image2.png")} />
                            <h4>WeedMat</h4>
                            {/*
                                    <p>Insight Experience Offers A Suite Of Experiential Business Simulation And Leadership Development
                                    And Developing New Leaders.</p> 
                                    */}
                        </div>
                    </div>
                </div >

                <div class="inquiry-section">
                    <h5>Get Excellent Service And Support And Grow Your Business Online With Valuda’s</h5>
                    <button class="inquiry-button">Inquiry Now</button>
                </div>

            </section >
        </>
    )
}

export default Portfolio
=======
import React, { useState, useEffect } from "react";
import "../../../assets/css/public/Our.css";
import { useValudasData } from "../../../context/Storage";
import noDataImage from "../../../assets/images/oops.png";

const Portfolio = () => {
  const { portfolio, serviceTechnology } = useValudasData();

  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [selectedTechnologyId, setSelectedTechnologyId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (serviceTechnology && serviceTechnology.length > 0) {
      setSelectedServiceId(serviceTechnology[0].service_id);
    }
  }, [serviceTechnology]);

  const handleServiceClick = (serviceId) => {
    setSelectedServiceId(serviceId);
    setSelectedTechnologyId(null);
    setCurrentIndex(0);
  };

  const handleTechnologyClick = (technologyId) => {
    setSelectedTechnologyId(technologyId);
    setCurrentIndex(0);
  };

  const filteredPortfolio = portfolio.filter((port) => {
    if (selectedServiceId !== null && port.service_id !== selectedServiceId) {
      return false;
    }
    if (
      selectedTechnologyId !== null &&
      port.technology_id !== selectedTechnologyId
    ) {
      return false;
    }
    return true;
  });

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % filteredPortfolio.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (currentIndex - 1 + filteredPortfolio.length) % filteredPortfolio.length
    );
  };

  return (
    <>
      <div className="our_first_page">
        <div className="empo_pera">
          <span>Transforming Ideas into Reality</span>
        </div>

        <div className="service_header">
          <h1>
            <span>Our Work</span>: Showcasing Excellence
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

      <div className="our_sec_page">
        <div className="portfolio">
          {serviceTechnology &&
            serviceTechnology.map((tech) => (
              <div
                className="port_details"
                key={tech.service_id}
                onClick={() => handleServiceClick(tech.service_id)}
              >
                <details className="custom_details">
                  <summary className="summary">
                    <img
                      src={require("../../../assets/images/cmshub.png")}
                      alt="summary"
                    />
                    <p id="cm">{tech.service_name}</p>
                  </summary>
                  <div className="details">
                    {tech.technologies.split(", ").map((technology, index) => (
                      <p key={technology} style={{ marginBottom: "10px" }}>
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTechnologyClick(
                              parseInt(tech.technology_ids.split(", ")[index])
                            );
                          }}
                          className={
                            selectedTechnologyId ===
                              parseInt(tech.technology_ids.split(", ")[index])
                              ? "selected-technology"
                              : ""
                          }
                        >
                          {technology}
                        </span>
                      </p>
                    ))}
                  </div>
                </details>
              </div>
            ))}
        </div>
        {filteredPortfolio.length > 0 ? (
          <div className="slid">
            {filteredPortfolio.length > 1 && (
              <div className="slick-prev" onClick={prevSlide}>
                <i className="fa-solid fa-arrow-left"></i>
              </div>
            )}
            <div className="slierMain">
              <div
                className="sliderTrack"
                style={{
                  transform: `translateX(-${currentIndex * (100 / 1.5)}%)`,
                }}
              >
                {filteredPortfolio.map((port) => (
                  <div className="sliderContent" key={port.id}>
                    <div className="proud_page" id="proud2">
                      <div className="proud_img">
                        <img src={`/upload/${port.thumbnail}`} alt="summary" />
                      </div>
                      <div className="weed_details">
                        <h5>{port.title}</h5>
                        <p>{port.short_description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {filteredPortfolio.length > 1 && (
              <div className="slick-next" onClick={nextSlide}>
                <i className="fa-solid fa-arrow-right"></i>
              </div>
            )}
          </div>
        ) : (
          <div className="no-data">
            <img src={noDataImage} alt="No data available" />
            <p>No data available</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Portfolio;
>>>>>>> 7f0bd4d54ae5eacb9abb139c7f27365c3f6c7442
