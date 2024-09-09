import React, { useEffect, useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

function Service() {
  useEffect(() => {
    fetchService();
    fetchTechnologies();
  }, []);

  const [service, setService] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);

  // Fetch the services
  const fetchService = async () => {
    try {
      const res = await axios.get(`${API}/getServicewithServiceID`);
      setService(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch the available technologies
  const fetchTechnologies = async () => {
    try {
      const res = await axios.get(`${API}/getstack`);
      setTechnologies(res.data); // Save technologies with their icons
    } catch (error) {
      console.log(error);
    }
  };

  // Handle clicking on a service to display technologies
  const handleServiceClick = (techArray) => {
    const parsedTechnologies = JSON.parse(techArray); // Parse the stringified array
    // Find the matching technologies with icons
    const matchedTechnologies = technologies.filter((tech) =>
      parsedTechnologies.includes(tech.Title)
    );
    setSelectedTechnologies(matchedTechnologies); // Set the technologies with icons
  };

  return (
    <section className="service-section">
      <div className="section-header">
        <div className="text-head">
          <p>EMPOWERING GROWTH, FUELLING INNOVATION</p>
        </div>
        <h2>
          <span id="border-header-text">Services</span>: Transformative Web &
          Mobile Solutions
        </h2>
        <p>
          Valuda’s Offers Premier Web & Mobile Development Services, Turning
          Your App Visions Into Realities. We're More Than Exceptional
          Developers; We're Strategic Partners Guiding Your Business Towards
          Success.
        </p>
      </div>

      {/* Service items */}
      <div className="service-items">
        <div className="service-items-content">
          {service.map((item) => (
            <div
              key={item.id}
              className="website-development-content"
              onClick={() => handleServiceClick(item.Technologies)}
            >
              <i className="fa-solid fa-code"></i>
              <div className="website-development-inner-text">
                <p>{item.Service_tagline}</p>
                <h3>{item.Service_name}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Technologies section */}
        <div className="service-item-inner-content">
          <div className="icon-grid">
            {selectedTechnologies.length > 0 ? (
              selectedTechnologies.map((tech, index) => (
                <div className="icon-card" key={index}>
                  <img
                    src={`/upload/${tech.Icon}`} // Assuming the images are stored in /uploads
                    alt={tech.Title}
                    className="icon-logo"
                  />
                  <p>{tech.Title}</p>
                </div>
              ))
            ) : (
              <p>No technologies available</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Service;
