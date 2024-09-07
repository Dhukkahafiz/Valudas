import React, { useEffect, useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

function Service() {
  useEffect(() => {
    fetchservice();
  }, []);

  const [service, setservice] = useState([]);

  const fetchservice = async () => {
    try {
      const res = await axios.get(`${API}/getServicewithServiceID`);
      setservice(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const platforms = [
    {
      name: "Laravel",
      logo: "https://static-00.iconduck.com/assets.00/node-js-icon-454x512-nztofx17.png",
    },
    {
      name: "Wordpress",
      logo: "https://static-00.iconduck.com/assets.00/node-js-icon-454x512-nztofx17.png",
    },
    {
      name: "Shopify",
      logo: "https://static-00.iconduck.com/assets.00/node-js-icon-454x512-nztofx17.png",
    },
    {
      name: "Joomla",
      logo: "https://static-00.iconduck.com/assets.00/node-js-icon-454x512-nztofx17.png",
    },
    {
      name: "MERN",
      logo: "https://static-00.iconduck.com/assets.00/node-js-icon-454x512-nztofx17.png",
    },
    {
      name: "Drupal",
      logo: "https://static-00.iconduck.com/assets.00/node-js-icon-454x512-nztofx17.png",
    },
  ];

  return (
    <section class="service-section">
      <div class="section-header">
        <div class="text-head">
          <p>EMPOWERING GROWTH, FUELLING INNOVATION</p>
        </div>
        <h2>
          <span id="border-header-text">Services</span>: Transformative Web &
          Mobile Solutions
        </h2>
        <p>
          {" "}
          Valuda’s Offers Premier Web & Mobile Development Services, Turning
          Your App Visions Into Realities. We're More Than Exceptional
          Developers; We're Strategic Partners Guiding Your Business Towards
          Success.
        </p>
      </div>
      <div class="service-items">
        <div class="service-items-content">
          {service.map((item) => (
            <div class="website-development-content">
              <i class="fa-solid fa-code"></i>
              <div class="website-development-inner-text">
                <p>{item.Service_tagline}</p>
                <h3>{item.Service_name}</h3>
              </div>
            </div>
          ))}
        </div>

        <div class="service-item-inner-content">
          {/* <div className="service-item-chiled">
            <img src="https://static-00.iconduck.com/assets.00/node-js-icon-454x512-nztofx17.png" />
            <p>Node JS</p>
          </div> */}

          <div className="icon-grid">
            {platforms.map((platform) => (
              <div className="icon-card" key={platform.name}>
                <img
                  src={platform.logo}
                  alt={platform.name}
                  className="icon-logo"
                />
                <p>{platform.name}</p>
              </div>
            ))}
          </div>

          {/* <img src={require("../../../assets/images/service-image.png")} /> */}
        </div>
      </div>
    </section>
  );
}

export default Service;
