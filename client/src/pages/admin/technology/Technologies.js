import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import DeleteModal from "../layout/DeleteModal";

const API = process.env.REACT_APP_API_URL;

const Technologies = () => {
  const [technologies, setTechnologies] = useState([]);

  useEffect(() => {
    fetchTechnologies();
  }, []);

  const fetchTechnologies = async () => {
    try {
      const res = await axios.get(`${API}/getstack`);
      setTechnologies(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTechnology = async (id) => {
    try {
      await axios.delete(`${API}/deleteTechnology/${id}`);
      console.log(id);
      fetchTechnologies();
    } catch (error) {
      console.error("Error deleting clan:", error);
    }
  };

  return (
    <section id="content">
      <main>
        <div className="head-title">
          <div className="adminleft">
            <h1>Technologies Page</h1>
          </div>

          <NavLink className="btn-download" to="/dashboard/addtechnologies">
            <span className="text">Add New</span>
          </NavLink>
        </div>

        <div className="table-data">
          <div className="order">
            <div className="head">
              <h3>Technologies Data</h3>
            </div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Icon</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {technologies.length > 0 ? (
                  technologies.map((data) => (
                    <tr key={data.id}>
                      <td>
                        <p>{data.id}</p>
                      </td>
                      <td>
                        <p>{data.Title}</p>
                      </td>
                      <td>
                        <p>
                          <img
                            src={`/upload/${data.Icon}`}
                            alt={`${data.Title} Icon`}
                            style={{ width: "50px", height: "50px" }}
                          />
                        </p>
                      </td>
                      <td style={{ width: "5rem" }}>
                      <DeleteModal onDelete={() => deleteTechnology(data.id)} />
                        <NavLink
                          to="/dashboard/editechnologies"
                          state={{ id: data.id }}
                        >
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
                      No Technologies data available
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

export default Technologies;
