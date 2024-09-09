import React, { useEffect, useState } from "react";
import "../../../assets/css/public/Our.css";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

const Portfolio = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [portfolio, setportfolio] = useState([]);
  const [Portfoliodata, setportfoliodata] = useState([]);
  const [filteredPortfolio, setFilteredPortfolio] = useState([]);
  // const [selectedService, setSelectedService] = useState(null);
  console.log(Portfoliodata);

  useEffect(() => {
    fetchPortfoliowithid();
    fetchPortfolio();
  }, []);

  const fetchPortfoliowithid = async () => {
    try {
      const res = await axios.get(`${API}/getServicewithPortfolioID`);
      setportfolio(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchPortfolio = async () => {
    try {
      const res = await axios.get(`${API}/getportfolio`);
      setportfoliodata(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const images = [
    {
      src: require("../../../assets/images/slider-image1.png"),
      title: "Proud Punch",
      description:
        "Insight Experience Offers A Suite Of Experiential Business Simulation And Leadership Development And Developing New Leaders.",
    },
    {
      src: require("../../../assets/images/slider-image2.png"),
      title: "WeedMat",
      description:
        "Insight Experience Offers A Suite Of Experiential Business Simulation And Leadership Development And Developing New Leaders.",
    },
    {
      src: require("../../../assets/images/slider-image1.png"),
      title: "hello",
      description:
        "Insight Experience Offers A Suite Of Experiential Business Simulation And Leadership Development And Developing New Leaders.",
    },
  ];

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleServiceClick = (childItem) => {
    // Filter portfolio data based on Service_name
    const filtered = Portfoliodata.filter((portfolioItem) =>
      portfolioItem.services
        .toLowerCase()
        .includes(childItem.Service_name.toLowerCase())
    );

    setFilteredPortfolio(filtered);
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
            {portfolio.map((item) => (
              <div className="cms-content" key={item.id}>
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
                      {portfolio
                        .filter((childItem) => childItem.parent_id === item.id)
                        .map((childItem) => (
                          <span
                            className="green-text"
                            key={childItem.id}
                            onClick={() => handleServiceClick(childItem)}
                          >
                            <p>{childItem.Service_name}</p>
                            <i
                              className="fa-solid fa-arrow-right"
                              style={{ color: " #52a01f" }}
                            ></i>
                          </span>
                        ))}
                    </div>
                  </details>
                ) : null}
              </div>
            ))}
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
                <div className="slider-item">
                  <img
                    src={
                      images[
                        currentIndex === 0
                          ? images.length - 1
                          : currentIndex - 1
                      ].src
                    }
                  />
                  <h4>
                    {
                      images[
                        currentIndex === 0
                          ? images.length - 1
                          : currentIndex - 1
                      ].title
                    }
                  </h4>
                  <p>
                    {
                      images[
                        currentIndex === 0
                          ? images.length - 1
                          : currentIndex - 1
                      ].description
                    }
                  </p>
                </div>
                <div className="slider-item">
                  <img src={images[currentIndex].src} />
                  <h4>{images[currentIndex].title}</h4>
                  <p>{images[currentIndex].description}</p>
                </div>
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

        <div>
          {/* Render filtered portfolio data */}
          {filteredPortfolio.length > 0 ? (
            filteredPortfolio.map((item) => (
              <div key={item.Id}>
                <h4>{item.Title}</h4>
                <p dangerouslySetInnerHTML={{ __html: item.Short_desc }} />
                <img
                  src={`${API}/path/to/thumbnails/${item.Thumbnail}`}
                  alt={item.Title}
                />
              </div>
            ))
          ) : (
            <p>No matching portfolio found for the selected service.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Portfolio;
