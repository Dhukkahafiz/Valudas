import React, { useEffect, useState } from "react";
import "../../../assets/css/public/Our.css";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

const Portfolio = () => {
  const [portfolioData, setPortfolioData] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch portfolio data
  const fetchPortfolioData = async () => {
    try {
      const res = await axios.get(`${API}/getportfolio`);
      setPortfolioData(res.data);
    } catch (error) {
      console.log("Error fetching portfolio data:", error);
    }
  };

  // Fetch service data
  const fetchServices = async () => {
    try {
      const res = await axios.get(`${API}/getServicewithPortfolioID`);
      setServices(res.data);
    } catch (error) {
      console.log("Error fetching services data:", error);
    }
  };

  // Handle service click and filter related portfolios
  const handleServiceClick = (service) => {
    const relatedPortfolios = portfolioData.filter((portfolio) =>
      JSON.parse(portfolio.services).includes(service.Service_name)
    );
    setSelectedServices(relatedPortfolios);
  };

  useEffect(() => {
    fetchPortfolioData();
    fetchServices();
  }, []);

  // Slider navigation functions
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === selectedServices.length - 1 ? 0 : prevIndex + 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? selectedServices.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <section className="our-work-section">
        <div className="section-header">
          <div className="text-head">
            <p>TRANSFORMING IDEAS INTO REALITY</p>
          </div>
          <h2>
            <span id="border-header-text">Our Work</span>: Showcasing Excellence
          </h2>
          <p>
            Experience The Satisfaction Of Our Clients Firsthand. With 100% Of
            Them Awarding Us Five Star Ratings On Google And Every Online
            Platform, Our Track Record Speaks Volumes About Our Commitment To
            Excellence.
          </p>
        </div>

        <div className="our-work-content">
          <div className="our-work-content-text">
            {services.map((item) => (
              <div key={item.id} className="cms-content">
                {item.parent_id === 0 ? (
                  <details className="cms-details">
                    <summary className="cms-content-header">
                      <img
                        src={require("../../../assets/images/CMS logo.png")}
                        alt="CMS Logo"
                      />
                      <div className="cms-content-head-text-icon">
                        <p>{item.Service_name}</p>
                        <i className="fa-solid fa-angle-up"></i>
                      </div>
                    </summary>

                    <div className="cms-content-dropdown-text">
                      {services
                        .filter((child) => child.parent_id === item.id)
                        .map((child) => (
                          <p
                            key={child.id}
                            onClick={() => handleServiceClick(child)}
                          >
                            {child.Service_name}
                            <i
                              className="fa-solid fa-arrow-right"
                              style={{ color: "#52a01f" }}
                            ></i>
                          </p>
                        ))}
                    </div>
                  </details>
                ) : null}
              </div>
            ))}
          </div>

          {/* Slider content section */}
          <div className="our-work-content-slider">
            <div className="slider-content">
              <button className="prev" onClick={prevSlide}>
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              <button className="next" onClick={nextSlide}>
                <i className="fa-solid fa-arrow-right"></i>
              </button>
              <div className="slider-track">
                {selectedServices.length > 0 ? (
                  <>
                    <div className="slider-item">
                      <img
                        src={`upload/${selectedServices[
                          currentIndex === 0
                            ? selectedServices.length - 1
                            : currentIndex - 1
                        ].Thumbnail
                          }`}
                        alt={
                          selectedServices[
                            currentIndex === 0
                              ? selectedServices.length - 1
                              : currentIndex - 1
                          ].Title
                        }
                      />
                      <h4>{ selectedServices
                         [currentIndex === 0? selectedServices.length - 1
                              : currentIndex - 1
                          ].Title
                        }
                      </h4>
                      <p
                        dangerouslySetInnerHTML={{
                          __html:
                            selectedServices[
                              currentIndex === 0
                                ? selectedServices.length - 1
                                : currentIndex - 1
                            ].Short_desc,
                        }}
                      />
                    </div>
                    <div className="slider-item">
                      <img
                        src={`upload/${selectedServices[currentIndex].Thumbnail
                          }`}
                        alt={selectedServices[currentIndex].Title}
                      />
                      <h4>{selectedServices[currentIndex].Title}</h4>
                      <p
                        dangerouslySetInnerHTML={{
                          __html:
                            selectedServices[currentIndex].Short_desc ||
                            "Description not available",
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <p>No related portfolios available.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="inquiry-section">
          <h5>
            Get Excellent Service And Support And Grow Your Business Online With
            Valuda’s
          </h5>
          <button className="inquiry-button">Inquiry Now</button>
        </div>
      </section>
    </>
  );
};

export default Portfolio;
