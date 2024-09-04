import axios from "axios";
import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useLocation, useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

const EditReview = () => {
  // state
  const [editReview, setEditReview] = useState({
    Author: "",
    description: "",
    Rating: "",
    Portfolio_data: [],
    Service_data: [],
    Meta_tags: [],
    Meta_keyword: [],
    Meta_desc: "",
    canonical_url: "",
    Updated_date: "",
  });

  // portfolio and services state
  const [portfolios, setPortfolios] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState("");
  const [selectedService, setSelectedService] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  //useeffect
  useEffect(() => {
    fetchPortfolios();
    fetchServices();
    if (location.state && location.state.Id) {
      fetchPerReview(location.state.Id);
    }
  }, [location.state?.Id]);

  // get data portfolio
  const fetchPortfolios = async () => {
    try {
      const res = await axios.get(`${API}/getportfolio`);
      setPortfolios(res.data || []);
    } catch (error) {
      console.error("Error fetching portfolios:", error);
    }
  };

  // get data services
  const fetchServices = async () => {
    try {
      const res = await axios.get(`${API}/getServies`);
      setServices(res.data || []);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  // get data per review
  const fetchPerReview = async (id) => {
    try {
      const res = await axios.get(`${API}/getPerReview/${id}`);
      const fetchedReview = res.data[0] || {
        Author: "",
        description: "",
        Rating: "",
        Portfolio_data: [],
        Service_data: [],
        Meta_tags: [],
        Meta_keyword: [],
        Meta_desc: "",
        canonical_url: "",
        Updated_date: "",
      };

      fetchedReview.Portfolio_data = Array.isArray(fetchedReview.Portfolio_data)
        ? fetchedReview.Portfolio_data
        : JSON.parse(fetchedReview.Portfolio_data || "[]");
      fetchedReview.Service_data = Array.isArray(fetchedReview.Service_data)
        ? fetchedReview.Service_data
        : JSON.parse(fetchedReview.Service_data || "[]");
      fetchedReview.Meta_tags = Array.isArray(fetchedReview.Meta_tags)
        ? fetchedReview.Meta_tags
        : JSON.parse(fetchedReview.Meta_tags || "[]");
      fetchedReview.Meta_keyword = Array.isArray(fetchedReview.Meta_keyword)
        ? fetchedReview.Meta_keyword
        : JSON.parse(fetchedReview.Meta_keyword || "[]");

      setEditReview({
        ...fetchedReview,
        // Updated_date: new Date().toISOString()
      });
    } catch (error) {
      console.error("Error fetching review data:", error);
    }
  };

  // handlechange edite
  const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    if (name === "Portfolio_data") {
      if (!editReview.Portfolio_data.includes(value)) {
        setEditReview((prevData) => ({
          ...prevData,
          Portfolio_data: [...prevData.Portfolio_data, value],
        }));
      }
      setSelectedPortfolio("");
    } else if (name === "Service_data") {
      if (!editReview.Service_data.includes(value)) {
        setEditReview((prevData) => ({
          ...prevData,
          Service_data: [...prevData.Service_data, value],
        }));
      }
      setSelectedService("");
    } else if (name === "Meta_tags" || name === "Meta_keyword") {
      if (e.key === "Enter" && value) {
        setEditReview((prevData) => ({
          ...prevData,
          [name]: [...prevData[name], value],
        }));
        e.target.value = "";
      }
    } else {
      setEditReview((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // handleremoveitem
  const handleRemoveItem = (name, value) => {
    setEditReview((prevData) => ({
      ...prevData,
      [name]: prevData[name].filter((item) => item !== value),
    }));
  };

  // handleediterchange
  const handleEditorChange = (name) => (event, editor) => {
    const data = editor.getData();
    setEditReview((prevData) => ({
      ...prevData,
      [name]: data,
    }));
  };

  // handleedite
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const getUname = localStorage.getItem("id");

      const reviewData = {
        id: location.state.Id,
        ...editReview,
        Portfolio_data: JSON.stringify(editReview.Portfolio_data || []),
        Service_data: JSON.stringify(editReview.Service_data || []),
        Meta_tags: JSON.stringify(editReview.Meta_tags || []),
        Meta_keyword: JSON.stringify(editReview.Meta_keyword || []),
        Meta_desc: editReview.Meta_desc,
        canonical_url: editReview.canonical_url,
        Updated_by: getUname,
        Updated_date: new Date().toISOString(),
      };

      await axios.put(`${API}/updateReview/${location.state.Id}`, reviewData);

      setEditReview({
        Author: "",
        description: "",
        Rating: "",
        Portfolio_data: [],
        Service_data: [],
        Meta_tags: [],
        Meta_keyword: [],
        Meta_desc: "",
        canonical_url: "",
        Updated_date: "",
      });

      navigate("/dashboard/review");
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  return (
    <section id="content">
      <main>
        <div className="add_clan">
          <div className="add_clan_title">
            <h1>Edit Review</h1>
          </div>

          <div className="addclan_input">
            <label>Author:</label>
            <br />
            <input
              type="text"
              name="Author"
              value={editReview.Author}
              onChange={handleChangeEdit}
            />
          </div>

          <div className="addclan_input">
            <label>Description:</label>
            <br />
            <CKEditor
              editor={ClassicEditor}
              data={editReview.description}
              onChange={handleEditorChange("description")}
            />
          </div>

          <div className="addclan_input">
            <label>Rating:</label>
            <br />
            <input
              type="text"
              name="Rating"
              value={editReview.Rating}
              onChange={handleChangeEdit}
            />
          </div>

          <div className="addclan_input">
            <label>Portfolio:</label>
            <br />
            <select
              style={{ width: "100%", padding: "10px" }}
              name="Portfolio_data"
              value={selectedPortfolio}
              onChange={handleChangeEdit}
            >
              <option value="">Select Portfolio</option>
              {portfolios.map((data) => (
                <option key={data.id} value={data.id}>
                  {data.Title}
                </option>
              ))}
            </select>
          </div>

          <div className="selected_items">
            <label>Selected Portfolios:</label>
            <ul>
              {Array.isArray(editReview.Portfolio_data) &&
                editReview.Portfolio_data.map((item) => (
                  <li key={item} className="selected_item">
                    <div>{item}</div>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem("Portfolio_data", item)}
                    >
                      <i
                        className="fas fa-times"
                        style={{ color: "#FF5F7C" }}
                      ></i>
                    </button>
                  </li>
                ))}
            </ul>
          </div>

          <div className="addclan_input">
            <label>Service:</label>
            <br />
            <select
              style={{ width: "100%", padding: "10px" }}
              name="Service_data"
              value={selectedService}
              onChange={handleChangeEdit}
            >
              <option value="">Select Service</option>
              {services.map((data) => (
                <option key={data.id} value={data.Service_name}>
                  {data.Service_name}
                </option>
              ))}
            </select>
          </div>

          <div className="selected_items">
            <label>Selected Services:</label>
            <ul>
              {Array.isArray(editReview.Service_data) &&
                editReview.Service_data.map((serviceId, index) => (
                  <li key={index}>
                    <div>{serviceId}</div>
                    <button
                      onClick={() =>
                        handleRemoveItem("Service_data", serviceId)
                      }
                    >
                      <i
                        className="fas fa-times"
                        style={{ color: "#FF5F7C" }}
                      ></i>
                    </button>
                  </li>
                ))}
            </ul>
          </div>

          <div className="addclan_input">
            <label>Meta Tags:</label>
            <br />
            <input
              type="text"
              name="Meta_tags"
              placeholder="Press Enter to add Meta Tag"
              onKeyDown={handleChangeEdit}
            />
          </div>

          <div className="selected_items">
            <label>Meta Tags:</label>
            <ul>
              {editReview.Meta_tags &&
                editReview.Meta_tags.map((tag, index) => (
                  <li key={index}>
                    <div>{tag}</div>
                    <button onClick={() => handleRemoveItem("Meta_tags", tag)}>
                      <i
                        className="fas fa-times"
                        style={{ color: "#FF5F7C" }}
                      ></i>
                    </button>
                  </li>
                ))}
            </ul>
          </div>

          <div className="addclan_input">
            <label>Meta Keywords:</label>
            <br />
            <input
              type="text"
              name="Meta_keyword"
              placeholder="Press Enter to add Meta Keyword"
              onKeyDown={handleChangeEdit}
            />
          </div>

          <div className="selected_items">
            <label>Meta Keywords:</label>
            <ul>
              {editReview.Meta_keyword &&
                editReview.Meta_keyword.map((keyword, index) => (
                  <li key={index}>
                    <div>{keyword}</div>
                    <button
                      onClick={() => handleRemoveItem("Meta_keyword", keyword)}
                    >
                      <i
                        className="fas fa-times"
                        style={{ color: "#FF5F7C" }}
                      ></i>
                    </button>
                  </li>
                ))}
            </ul>
          </div>

          <div className="addclan_input">
            <label>Meta Description:</label>
            <br />
            <input
              type="text"
              name="Meta_desc"
              value={editReview.Meta_desc}
              onChange={handleChangeEdit}
            />
          </div>

          <div className="addclan_input">
            <label>Canonical URL:</label>
            <br />
            <input
              type="text"
              name="canonical_url"
              value={editReview.canonical_url}
              onChange={handleChangeEdit}
            />
          </div>

          <div className="addclan_input">
            <button type="submit" onClick={handleEditSubmit}>
              Update Review
            </button>
          </div>
        </div>
      </main>
    </section>
  );
};

export default EditReview;
