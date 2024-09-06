<<<<<<< HEAD
import React from 'react';

function Service() {
    return (
        <section class="service-section">
            <div class="section-header">
                <div class="text-head">
                    <p>EMPOWERING GROWTH, FUELLING INNOVATION</p>
                </div>
                <h2><span id="border-header-text">Services</span>: Transformative Web & Mobile Solutions</h2>
                <p> Valuda’s Offers Premier Web & Mobile Development Services, Turning Your App Visions Into Realities.
                    We're More Than Exceptional Developers; We're Strategic Partners Guiding Your Business Towards Success.
                </p>
            </div>
            <div class="service-items">

                <div class="service-items-content">

                    <div class="website-development-content">
                        <i class="fa-solid fa-code"></i>
                        <div class="website-development-inner-text">
                            <p>YOUR DIGITAL PRESENCE, PERFECTED</p>
                            <h3>Website Development</h3>
                        </div>
                    </div>

                    <div class="mobile-app-development-content">
                        <i class="fa-solid fa-mobile-button"></i>
                        <div class="website-development-inner-text">
                            <p>INNOVATIVE SOLUTIONS FOR EVERY INDUSTRY</p>
                            <h3>Mobile App Development</h3>
                        </div>
                    </div>

                    <div class="front-end-development-content">
                        <i class="fa-solid fa-screwdriver-wrench"></i>
                        <div class="website-development-inner-text">
                            <p>CRAFTING ENGAGING USER EXPERIENCES</p>
                            <h3>Front-End-Development</h3>
                        </div>
                    </div>

                </div>

                <div class="service-item-inner-content">
                    <img src={require("../../../assets/images/service-image.png")}/>
                </div>
            </div>
        </section>
    );
}
=======
import React, { useState, useEffect } from "react";
import "../../../assets/css/public/Service.css";
import { useValudasData } from "../../../context/Storage";

const Service = () => {
  const { serviceTechnology } = useValudasData();
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    if (serviceTechnology && serviceTechnology.length > 0) {
      setSelectedService(serviceTechnology[0]);
    }
  }, [serviceTechnology]);

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  return (
    <>
      <div className="Service">
        <div className="ser_first_page">
          <div className="empo_pera">
            <span>Empowering Growth, Fuelling Innovation</span>
          </div>
          <div className="service_header">
            <h1>
              <span>Services</span>: Transformative Web & Mobile Solutions
            </h1>
          </div>
          <div className="service_pera">
            <p>
              Valuda’s offers premier Web & Mobile development services, turning
              your app visions into realities. We're more than exceptional
              developers; we're strategic partners guiding your business towards
              success.
            </p>
          </div>
        </div>

        <div className="service_sec_page">
          <div className="devlopment_page">
            {serviceTechnology && serviceTechnology.length > 0
              ? serviceTechnology.map((service, index) => (
                  <div
                    className="dev_Page"
                    key={index}
                    onClick={() => handleServiceClick(service)}
                  >
                    <span className="cms_i" id="dev">
                      <i className="fa-solid fa-code"></i>
                    </span>
                    <span className="cms_Pera">
                      <p>{service.service_tagline}</p>
                      <h5>{service.service_name}</h5>
                    </span>
                  </div>
                ))
              : "N/A"}
          </div>

          {selectedService && (
            <div className="cms_devlopment">
              <div className="cms">
                <span>{selectedService.service_name} </span>
                <p
                  dangerouslySetInnerHTML={{
                    __html: selectedService.service_description,
                  }}
                />
              </div>
              <div className="all_language_boxes">
                {selectedService.technologies.split(", ").map((tech, index) => {
                  const tech_photo = selectedService.tech_photos[index];
                  return (
                    <div className="language_box" key={index}>
                      <img src={`/upload/${tech_photo}`} alt="thumbnail"></img>
                      <p>{tech}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="service_third">
          <div className="third_header">
            <h1>Pioneering Exceptional Digital Experiences!</h1>
            <p>
              We are passionate about delivering world-class digital products
              and ensuring client satisfaction. Are you eager to achieve
              success? If so, let's get started.
            </p>
          </div>
          <div className="lets_bt">
            <button>Let’s Get Started</button>
          </div>
        </div>
      </div>
    </>
  );
};
>>>>>>> 7f0bd4d54ae5eacb9abb139c7f27365c3f6c7442

export default Service;
