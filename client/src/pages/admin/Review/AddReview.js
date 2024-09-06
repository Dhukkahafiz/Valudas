import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

const AddReview = () => {
  // state
  const [addReview, setAddReview] = useState({
    Author: "",
    description: "",
    Rating: "",
    Portfolio_data: [],
    Service_data: [],
    Meta_tags: [],
    Meta_keyword: [],
    Meta_desc: "",
    canonical_url: "",
    Created_date: new Date().toISOString(),
    Created_by: "",
  });

  // getstate
  const [Portfolios, setPortfolios] = useState([]);
  const [Services, setServices] = useState([]);

  useEffect(() => {
    fetchPortfolios();
    fetchServices();
  }, []);

  const navigate = useNavigate();

  // get data portfolio
  const fetchPortfolios = async () => {
    try {
      const res = await axios.get(`${API}/getportfolio`);
      setPortfolios(res.data);
    } catch (error) {
      console.error("Error fetching portfolios:", error);
    }
  };

  // get data services
  const fetchServices = async () => {
    try {
      const res = await axios.get(`${API}/getServies`);
      setServices(res.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  // add handlechange
  const handleChangeAdd = (e) => {
    const { name, value } = e.target;
    if (name === "Portfolio_data" || name === "Service_data") {
      if (value && !addReview[name].includes(value)) {
        setAddReview((prevData) => ({
          ...prevData,
          [name]: [...prevData[name], value],
        }));
      }
    } else {
      setAddReview((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // meta tag input change
  const handleMetaInputChange = (e) => {
    const { name, value } = e.target;
    if (value && !addReview[name].includes(value)) {
      setAddReview((prevData) => ({
        ...prevData,
        [name]: [...prevData[name], value],
      }));
    }
    e.target.value = "";
  };

  // remove item handlechange
  const handleRemoveItem = (name, value) => {
    setAddReview((prevData) => ({
      ...prevData,
      [name]: prevData[name].filter((item) => item !== value),
    }));
  };

  // editer handlecange
  const handleEditorChange = (name) => (event, editor) => {
    const data = editor.getData();
    setAddReview((prevData) => ({
      ...prevData,
      [name]: data,
    }));
  };

  // handlesubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const getUname = localStorage.getItem("id");
      const reviewData = {
        ...addReview,
        Portfolio_data: JSON.stringify(addReview.Portfolio_data),
        Service_data: JSON.stringify(addReview.Service_data),
        Meta_tags: JSON.stringify(addReview.Meta_tags),
        Meta_keyword: JSON.stringify(addReview.Meta_keyword),

        Created_by: getUname,
      };

      await axios.post(`${API}/addReview`, reviewData);

      setAddReview({
        Author: "",
        description: "",
        Rating: "",
        Portfolio_data: [],
        Service_data: [],
        Meta_tags: [],
        Meta_keyword: [],
        Meta_desc: "",
        canonical_url: "",
        Created_date: new Date().toISOString(),
        Created_by: "",
      });

      navigate("/dashboard/review");
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  return (
    <section id="content">
      <main>
        <div className="add_clan">
          <div className="add_clan_title">
            <h1>Add New Review</h1>
          </div>

          <div className="addclan_input">
            <label>Author:</label>
            <br />
            <input
              type="text"
              name="Author"
              value={addReview.Author}
              onChange={handleChangeAdd}
            />
          </div>

          <div className="addclan_input">
            <label>Description:</label>
            <br />
            <CKEditor
              editor={ClassicEditor}
              data={addReview.description}
              onChange={handleEditorChange("description")}
            />
          </div>

          <div className="addclan_input">
            <label>Rating:</label>
            <br />
            <input
              type="text"
              name="Rating"
              value={addReview.Rating}
              onChange={handleChangeAdd}
            />
          </div>

          <div className="addclan_input">
            <label>Portfolio:</label>
            <br />
            <select
              style={{ width: "100%", padding: "10px" }}
              name="Portfolio_data"
              value=""
              onChange={handleChangeAdd}
            >
              <option value="">Select Portfolio</option>
              {Portfolios.map((data) => (
                <option key={data.id} value={data.Title}>
                  {data.Title}
                </option>
              ))}
            </select>
          </div>

          <div className="selected_items">
            <ul>
              {addReview.Portfolio_data.map((portfolioTitle, index) => (
                <li key={index}>
                  <div>{portfolioTitle}</div>
                  <button
                    onClick={() =>
                      handleRemoveItem("Portfolio_data", portfolioTitle)
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
            <label>Service:</label>
            <br />
            <select
              style={{ width: "100%", padding: "10px" }}
              name="Service_data"
              value=""
              onChange={handleChangeAdd}
            >
              <option value="">Select Service</option>
              {Services.map((data) => (
                <option key={data.id} value={data.Service_name}>
                  {data.Service_name}
                </option>
              ))}
            </select>
          </div>

          <div className="selected_items">
            <ul>
              {addReview.Service_data.map((serviceName, index) => (
                <li key={index}>
                  <div>{serviceName}</div>
                  <button
                    onClick={() =>
                      handleRemoveItem("Service_data", serviceName)
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
              onKeyDown={(e) => e.key === "Enter" && handleMetaInputChange(e)}
            />
          </div>

          <div className="selected_items">
            <ul>
              {addReview.Meta_tags.map((tag, index) => (
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
              onKeyDown={(e) => e.key === "Enter" && handleMetaInputChange(e)}
            />
          </div>

          <div className="selected_items">
            <ul>
              {addReview.Meta_keyword.map((keyword, index) => (
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
              value={addReview.Meta_desc}
              onChange={handleChangeAdd}
            />
          </div>

          <div className="addclan_input">
            <label>Canonical URL:</label>
            <br />
            <input
              type="text"
              name="canonical_url"
              value={addReview.canonical_url}
              onChange={handleChangeAdd}
            />
          </div>

          <div className="add_clan_btn">
            <button onClick={handleSubmit}>Add Review</button>
          </div>
        </div>
      </main>
    </section>
  );
};

export default AddReview;
