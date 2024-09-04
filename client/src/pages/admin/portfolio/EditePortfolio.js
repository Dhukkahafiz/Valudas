import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

const EditePortfolio = () => {
  const [EditePortfolio, setEditePortfolio] = useState({
    Thumbnail: null,
    Company_name: "",
    Title: "",
    Short_desc: "",
    long_Desc: "",
    Industries: [],
    services: [],
    Technologies: [],
    Meta_tags: [],
    Meta_keyword: [],
    Meta_desc: "",
    canonical_url: "",
    Updated_by: "",
    Updated_date: "",
  });

  const [Industries, setIndustries] = useState([]);
  const [services, setservices] = useState([]);
  const [services_page, setservices_page] = useState([]);
  const [Technologies, setTechnologies] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchIndustries();
    fetchTechnologies();
    if (id) {
      fetchPerPortfolio(id);
      service();
    }
  }, [id]);

  // get service data 

  const service = async () => {
    try {
      const res = await axios.get(`${API}/getservice`);
      const resp = await axios.get(`${API}/getservicepage`);

      setservices(res.data);
      setservices_page(resp.data);
    } catch (error) {
      console.error("Error fetching industries:", error);
    }
  };
  // Get Industries data 
  const fetchIndustries = async () => {
    try {
      const res = await axios.get(`${API}/getIndustries`);
      setIndustries(res.data);
    } catch (error) {
      console.error("Error fetching industries:", error);
    }
  };

  // get Technologies
  const fetchTechnologies = async () => {
    try {
      const res = await axios.get(`${API}/getTechnologies`);
      setTechnologies(res.data);
    } catch (error) {
      console.error("Error fetching technologies:", error);
    }
  };

  // Get Portfolio data With id
  const fetchPerPortfolio = async (id) => {
    try {
      const res = await axios.get(`${API}/getPerPortfolio/${id}`);
      const data = res.data[0] || {};

      data.Industries = Array.isArray(data.Industries)
        ? data.Industries
        : JSON.parse(data.Industries || "[]");
      data.services = Array.isArray(data.services)
        ? data.services
        : JSON.parse(data.services || "[]");
      data.Technologies = Array.isArray(data.Technologies)
        ? data.Technologies
        : JSON.parse(data.Technologies || "[]");

      data.Meta_tags = Array.isArray(data.Meta_tags)
        ? data.Meta_tags
        : JSON.parse(data.Meta_tags || "[]");

      data.Meta_keyword = Array.isArray(data.Meta_keyword)
        ? data.Meta_keyword
        : JSON.parse(data.Meta_keyword || "[]");

      setEditePortfolio((prevData) => ({
        ...prevData,
        ...data,
      }));
    } catch (error) {
      console.error("Error fetching portfolio data:", error);
    }
  };


  const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    setEditePortfolio((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setEditePortfolio((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };


  //  Ck Editer 
  const handleEditorChange = (name) => (event, editor) => {
    const data = editor.getData();
    setEditePortfolio((prevData) => ({
      ...prevData,
      [name]: data,
    }));
  };

  const handleRemoveItem = (name, value) => {
    setEditePortfolio((prevData) => ({
      ...prevData,
      [name]: prevData[name].filter((item) => item !== value),
    }));
  };

  const handleKeyPress = (e) => {
    const { name, value } = e.target;
    if (e.key === "Enter" && value) {
      setEditePortfolio((prevData) => ({
        ...prevData,
        [name]: [...prevData[name], value],
      }));
      e.target.value = "";
    }
  };

  // Put Data

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("Thumbnail", EditePortfolio.Thumbnail);
      formData.append("Company_name", EditePortfolio.Company_name);
      formData.append("Title", EditePortfolio.Title);
      formData.append("Short_desc", EditePortfolio.Short_desc);
      formData.append("long_Desc", EditePortfolio.long_Desc);
      formData.append("Meta_desc", EditePortfolio.Meta_desc);
      formData.append("canonical_url", EditePortfolio.canonical_url);

      formData.append("Industries", JSON.stringify(EditePortfolio.Industries));
      formData.append("services", JSON.stringify(EditePortfolio.services));

      formData.append(
        "Technologies",
        JSON.stringify(EditePortfolio.Technologies)
      );
      formData.append("Meta_tags", JSON.stringify(EditePortfolio.Meta_tags));
      formData.append(
        "Meta_keyword",
        JSON.stringify(EditePortfolio.Meta_keyword)
      );
      const getUname = localStorage.getItem("id");

      formData.append("Updated_by", getUname);
      formData.append("Updated_date", new Date().toISOString());

      await axios.put(`${API}/updateportfolio/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Clear form after submission
      navigate("/dashboard/portfolio");
    } catch (error) {
      console.error("Error saving portfolio:", error);
    }
  };

  return (
    <section id="content">
      <main>
        <div className="add_clan">
          <div className="add_clan_title">
            <h1>Edit Portfolio</h1>
          </div>

          <div className="addclan_input">
            <label>Thumbnail:</label>
            <br />
            <input type="file" name="Thumbnail" onChange={handleFileChange} />
          </div>

          <div className="addclan_input">
            <label>Company Name:</label>
            <br />
            <input
              type="text"
              name="Company_name"
              value={EditePortfolio.Company_name}
              onChange={handleChangeEdit}
            />
          </div>

          <div className="addclan_input">
            <label>Title:</label>
            <br />
            <input
              type="text"
              name="Title"
              value={EditePortfolio.Title}
              onChange={handleChangeEdit}
            />
          </div>

          <div className="addclan_input">
            <label>Short Description:</label>
            <br />
            <CKEditor
              editor={ClassicEditor}
              data={EditePortfolio.Short_desc}
              onChange={handleEditorChange("Short_desc")}
            />
          </div>

          <div className="addclan_input">
            <label>Long Description:</label>
            <br />
            <CKEditor
              editor={ClassicEditor}
              data={EditePortfolio.long_Desc}
              onChange={handleEditorChange("long_Desc")}
            />
          </div>

          <div className="addclan_input">
            <label>Industries:</label>
            <br />
            <select
              style={{ width: "100%", padding: "10px" }}
              name="Industries"
              onChange={(e) => {
                const value = e.target.value;
                if (value && !EditePortfolio.Industries.includes(value)) {
                  setEditePortfolio((prevData) => ({
                    ...prevData,
                    Industries: [...prevData.Industries, value],
                  }));
                }
              }}
            >
              <option value="">Select Industry</option>
              {Industries.map((data) => (
                <option key={data.id} value={data.industry_name}>
                  {data.industry_name}
                </option>
              ))}
            </select>
          </div>

          {/* Display selected industries */}
          <div className="selected_items">
            <label>Selected Industries:</label>
            <ul>
              {Array.isArray(EditePortfolio.Industries) &&
                EditePortfolio.Industries.map((item) => (
                  <li key={item} className="selected_item">
                    <div>{item}</div>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem("Industries", item)}
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
            <label>services:</label>
            <br />
            <select
              style={{ width: "100%", padding: "10px" }}
              name="services"
              value=""
              onChange={(e) => {
                const value = e.target.value;
                if (value && !EditePortfolio.services.includes(value)) {
                  setEditePortfolio((prevData) => ({
                    ...prevData,
                    services: [...prevData.services, value],
                  }));
                }
              }}
            >
              <option value="">Select service</option>
              {services.map((data) => (
                <option key={data.id} value={data.Service_name}>
                  {data.Service_name}
                </option>
              ))}{" "}
              {services_page.map((data) => (
                <option key={data.id} value={data.Service_name}>
                  {data.Service_name}
                </option>
              ))}
            </select>
          </div>
          <div className="selected_items">
            <ul>
              {EditePortfolio.services.map((industry, index) => (
                <li key={index}>
                  <div>{industry}</div>
                  <button
                    onClick={() => handleRemoveItem("services", industry)}
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
            <label>Technologies:</label>
            <br />
            <select
              style={{ width: "100%", padding: "10px" }}
              name="Technologies"
              onChange={(e) => {
                const value = e.target.value;
                if (value && !EditePortfolio.Technologies.includes(value)) {
                  setEditePortfolio((prevData) => ({
                    ...prevData,
                    Technologies: [...prevData.Technologies, value],
                  }));
                }
              }}
            >
              <option value="">Select Technology</option>
              {Technologies.map((data) => (
                <option key={data.id} value={data.Title}>
                  {data.Title}
                </option>
              ))}
            </select>
          </div>

          <div className="selected_items">
            <label>Selected Technologies:</label>
            <ul>
              {Array.isArray(EditePortfolio.Technologies) &&
                EditePortfolio.Technologies.map((item) => (
                  <li key={item} className="selected_item">
                    <div>{item}</div>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem("Technologies", item)}
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
              onKeyDown={handleKeyPress}
            />
          </div>

          <div className="selected_items">
            <label>Meta Tags:</label>
            <ul>
              {Array.isArray(EditePortfolio.Meta_tags) &&
                EditePortfolio.Meta_tags.map((item) => (
                  <li key={item} className="selected_item">
                    <div>{item}</div>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem("Meta_tags", item)}
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
            <label>Meta Keywords:</label>
            <br />
            <input
              type="text"
              name="Meta_keyword"
              placeholder="Press Enter to add Meta Keyword"
              onKeyDown={handleKeyPress}
            />
          </div>

          <div className="selected_items">
            <label>Meta Keywords:</label>
            <ul>
              {Array.isArray(EditePortfolio.Meta_keyword) &&
                EditePortfolio.Meta_keyword.map((item) => (
                  <li key={item} className="selected_item">
                    <div>{item}</div>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem("Meta_keyword", item)}
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
            <textarea
              style={{ width: "100%", padding: "15px 15px" }}
              name="Meta_desc"
              value={EditePortfolio.Meta_desc}
              onChange={handleChangeEdit}
              rows="4"
              cols="50"
            ></textarea>
          </div>

          <div className="addclan_input">
            <label>Canonical URL:</label>
            <br />
            <input
              type="text"
              name="canonical_url"
              value={EditePortfolio.canonical_url}
              onChange={handleChangeEdit}
            />
          </div>

          <div className="add_clan_btn">
            <button type="submit" onClick={handleEditSubmit}>
              Save
            </button>
          </div>
        </div>
      </main>
    </section>
  );
};

export default EditePortfolio;
