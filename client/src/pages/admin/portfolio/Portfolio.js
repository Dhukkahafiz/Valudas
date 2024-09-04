import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import DeleteModal from "../layout/DeleteModal";

const API = process.env.REACT_APP_API_URL;

const Portfolio = () => {
  const [portfolio, setportfolio] = useState([]);
  console.log(portfolio);
  useEffect(() => {
    fetchPortfolio();
  }, []);

  // gat Portfolio

  const fetchPortfolio = async () => {
    try {
      const res = await axios.get(`${API}/getportfolio`);
      setportfolio(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete POrtfolio data
  const deletePortfolio = async (id) => {
    try {
      await axios.delete(`${API}/deleteportfolio/${id}`);
      fetchPortfolio();
    } catch (error) {
      console.error("Error deleting clan:", error);
    }
  };

  return (
    <section id="content">
      <main>
        <div className="head-title">
          <div className="adminleft">
            <h1>Portfolio Page</h1>
          </div>

          <NavLink className="btn-download" to="/dashboard/addportfolio">
            <span className="text">Add New Portfolio</span>
          </NavLink>
        </div>

        <div className="table-data">
          <div className="order">
            <div className="head">
              <h3>Portfolio Data</h3>
            </div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Thumbnail</th>
                  <th>Company Name</th>
                  <th>Title</th>
                  <th>Short_desc</th>
                  <th>Industries</th>
                  <th>Technologies</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.length > 0 ? (
                  portfolio.map((data) => (
                    <tr key={data.id}>
                      <td>
                        <p>{data.Id}</p>
                      </td>
                      <td>
                        <p>
                          <img
                            src={`/upload/${data.Thumbnail}`}
                            alt={`${data.Title} Icon`}
                            style={{ width: "50px", height: "50px" }}
                          />
                        </p>
                      </td>
                      <td>
                        <p>{data.Company_name}</p>
                      </td>
                      <td>
                        <p>{data.Title}</p>
                      </td>

                      <td>
                        <p>{data.Short_desc}</p>
                      </td>
                      <td>
                        <p>{data.Industries}</p>
                      </td>
                      <td>
                        <p>{data.Technologies}</p>
                      </td>

                      <td style={{ width: "5rem" }}>
                        <DeleteModal
                          onDelete={() => deletePortfolio(data.Id)}
                        />
                        <NavLink to={`/dashboard/editportfolio/${data.Id}`}>
                          <button
                            style={{
                              backgroundColor: "transparent",
                              padding: "0.5rem",
                              fontSize: "1.2rem",
                              border: "none",
                              color: "#52a01f",
                              cursor: "pointer",
                            }}
                          >
                            <i className="fa-solid fa-pen"></i>
                          </button>
                        </NavLink>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ color: "red" }}>
                      No Portfolio data available
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
};

export default Portfolio;
