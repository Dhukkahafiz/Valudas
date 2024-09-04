import React, { useEffect, useState } from "react";
import "../../../assets/css/admin/main.css";
import axios from "axios";
import DeleteModal from "../layout/DeleteModal";
import { NavLink } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

function Service_pages() {
  const [services_page, setservices_page] = useState([]);

  useEffect(() => {
    getServiceData();
  }, []);

  // get service data
  const getServiceData = () => {
    axios
      .get(`${API}/getservicepage`)
      .then((res) => setservices_page(res.data))
      .catch((error) => console.log(error));
  };
  // delete service data

  const deleteServiceData = async (id) => {
    await axios
      .delete(`${API}/DeleteServicedata/${id}`)
      .then((response) => {
        getServiceData();
      })
      .catch((error) => {
        console.log("Error deleting brand data in Brand.js:", error);
      });
  };
  return (
    <section id="content">
      <main>
        <div className="head-title">
          <div className="adminleft">
            <h1>Services Page</h1>
          </div>

          <NavLink to="/dashboard/addService_pages">
            <button
              className="btn-download"
              style={{
                border: "none",
                color: "white",
                cursor: "pointer",
              }}
            >
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
                  <th>id </th>
                  <th>Icon</th>
                  <th>Service_name</th>
                  <th>Short_desc</th>

                  <th>Operation</th>
                </tr>
              </thead>
              <tbody>
                {services_page && services_page.length > 0 ? (
                  services_page.map((service, index) => {
                    return (
                      <>
                        <tr key={index}>
                          <td>
                            <p>{service.id}</p>
                          </td>
                          <td>
                            <img
                              src={`/upload/${service.Icon}`}
                              alt="Service Icon"
                            />
                          </td>
                          <td>
                            <p>{service.Service_name}</p>
                          </td>
                          <td>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: service.Short_desc || "null",
                              }}
                            />
                          </td>

                          <td>
                            <DeleteModal
                              onDelete={() => deleteServiceData(service.id)}
                            />

                            <NavLink
                              to={`/dashboard/EditService_pages/${service.id}`}
                            >
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
  ); 
}

export default Service_pages;
