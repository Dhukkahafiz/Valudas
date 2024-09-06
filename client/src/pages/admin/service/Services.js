import React, { useEffect, useState } from "react";

import "../../../assets/css/admin/main.css";
import DeleteModal from "../layout/DeleteModal";

import axios from "axios";
import HOC from "../layout/HOC";
import { NavLink } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

const Services = () => {
  useEffect(() => {
    getservice();
  }, []);

  const [service, setService] = useState([]);

  // get service data 

  const getservice = async () => {
    try {
      const response = await axios.get(`${API}/getservice`);
      setService(response.data);
    } catch (error) {
      console.error("Error fetching city list:", error);
    }
  };
  // delete service data 

  const deleteServiceData = async (id) => {
    await axios
      .delete(`${API}/deleteservice/${id}`)
      .then((response) => {
        getservice();
      })
      .catch((error) => {
        console.log("Error deleting brand data in Brand.js:", error);
      });
  };

  return (
    <>
      <section id="content">
        <main>
          <div className="head-title">
            <div className="adminleft">
              <h1>Services Page</h1>
            </div>
            <NavLink to="/dashboard/addservice">
              <button
                className="btn-download"
                style={{
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                {/* <Plus /> */}
                <span className="text">New Service</span>
              </button>
            </NavLink>
          </div>

          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>Services Data</h3>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Service_icon</th>
                    <th>Service Name</th>
                    <th>Tagline</th>

                    <th>Technologis</th>
                    <th>Operation</th>
                  </tr>
                </thead>
                <tbody>
                  {service && service.length > 0 ? (
                    service.map((service, index) => {
                      return (
                        <>
                          <tr key={index}>
                            <td>
                              <img
                                src={`/upload/${service.Service_icon}`}
                                alt="Service Icon"
                              />
                            </td>
                            <td>
                              <p>{service.Service_name}</p>
                            </td>
                            <td>
                              <p>{service.Service_tagline}</p>
                            </td>

                            <td>
                              <p>{service.Technologies}</p>
                            </td>

                            <td>
                              <DeleteModal
                                onDelete={() => deleteServiceData(service.id)}
                              />
                              <NavLink  to={`/dashboard/editservice/${service.id}`}>

                              <button
                                style={{
                                  fontSize: "1.2rem",
                                  backgroundColor: "transparent",
                                  border: "none",
                                  color: "#52a01f",
                                  padding: "0.5rem",
                                  cursor: "pointer",
                                }}
                              >
                                <i className="fa-solid fa-pen"></i>
                              </button>
                              </NavLink>
                            </td>
                          </tr>
                        </>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="8" style={{ color: "red" }}>
                        No services data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Services;
