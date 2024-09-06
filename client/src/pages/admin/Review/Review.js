import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import DeleteModal from "../../../pages/admin/layout/DeleteModal";

const API = process.env.REACT_APP_API_URL;

const Review = () => {
  const [review, setreview] = useState([]);

  useEffect(() => {
    fetchReview();
  }, []);

  // get Review Data
  const fetchReview = async () => {
    try {
      const res = await axios.get(`${API}/getReview`);
      setreview(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Review Data

  const deleteReview = async (id) => {
    try {
      await axios.delete(`${API}/deleteReview/${id}`);
      console.log(id);
      fetchReview();
    } catch (error) {
      console.error("Error deleting clan:", error);
    }
  };

  return (
    <section id="content">
      <main>
        <div className="head-title">
          <div className="adminleft">
            <h1>Review Page</h1>
          </div>

          <NavLink className="btn-download" to="/dashboard/addreview">
            <span className="text">Add New</span>
          </NavLink>
        </div>

        <div className="table-data">
          <div className="order">
            <div className="head">
              <h3>Review Data</h3>
            </div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Author</th>
                  <th>Rating</th>
                  <th>Portfolio</th>
                  <th>Service</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {review.length > 0 ? (
                  review.map((data) => (
                    <tr key={data.Id}>
                      <td>
                        <p>{data.Id}</p>
                      </td>
                      <td>
                        <p>{data.Author}</p>
                      </td>
                      <td>
                        <p>{data.Rating}</p>
                      </td>
                      <td>
                        <p>{data.Portfolio_data}</p>
                      </td>{" "}
                      <td>
                        <p>{data.Service_data}</p>
                      </td>
                      <td style={{ width: "5rem" }}>
                        <DeleteModal onDelete={() => deleteReview(data.Id)} />
                        <NavLink
                          to="/dashboard/editreview"
                          state={{ Id: data.Id }}
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
                      No Review data available
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

export default Review;
