import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

const EditeTechnologies = () => {
  const [editTechnologies, setEditTechnologies] = useState({
    Title: "",
    Icon: null,
    Meta_tags: [],
    Meta_keyword: [],
    Meta_desc: "",
    canonical_url: "",
    Updated_date: "",
    Updated_by: "",
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPerTechnologies(location.state.id);
  }, [location.state.id]);
//    get Technologis data With Id 
  const fetchPerTechnologies = async (id) => {
    try {
      const res = await axios.get(`${API}/getPerTechnologies/${id}`);
      const data = res.data[0] || {};

      data.Meta_tags = Array.isArray(data.Meta_tags)
        ? data.Meta_tags
        : JSON.parse(data.Meta_tags || "[]");
      data.Meta_keyword = Array.isArray(data.Meta_keyword)
        ? data.Meta_keyword
        : JSON.parse(data.Meta_keyword || "[]");

      setEditTechnologies({
        ...data,
        Updated_date: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error fetching technology data:", error);
    }
  };

  const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    setEditTechnologies((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setEditTechnologies((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };

  const handleKeyPress = (e) => {
    const { name, value } = e.target;
    if (e.key === "Enter" && value) {
      setEditTechnologies((prevData) => ({
        ...prevData,
        [name]: [...prevData[name], value],
      }));
      e.target.value = "";
    }
  };

  const handleRemoveItem = (name, value) => {
    setEditTechnologies((prevData) => ({
      ...prevData,
      [name]: prevData[name].filter((item) => item !== value),
    }));
  };


//   technology Put data

  const handleEditTechnology = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("Title", editTechnologies.Title);
      formData.append("Icon", editTechnologies.Icon);
      formData.append("Meta_tags", JSON.stringify(editTechnologies.Meta_tags));
      formData.append(
        "Meta_keyword",
        JSON.stringify(editTechnologies.Meta_keyword)
      );
      formData.append("Meta_desc", editTechnologies.Meta_desc);
      formData.append("canonical_url", editTechnologies.canonical_url);
      formData.append("Updated_date", editTechnologies.Updated_date);

      const getUname = localStorage.getItem("id");
      formData.append("Updated_by", getUname);

      await axios.put(`${API}/updatestack/${location.state.id}`, formData);

      setEditTechnologies({
        Title: "",
        Icon: null,
        Meta_tags: [],
        Meta_keyword: [],
        Meta_desc: "",
        canonical_url: "",
        Updated_date: "",
        Updated_by: "",
      });

      navigate("/dashboard/technologies");
    } catch (error) {
      console.error("Error updating technology data:", error);
    }
  };

  return (
    <section id="content">
      <main>
        <div className="add_clan">
          <div className="add_clan_title">
            <h1>Edit Technology</h1>
          </div>

          <div className="addclan_input">
            <label>Title:</label>
            <br />
            <input
              type="text"
              placeholder="Title"
              name="Title"
              value={editTechnologies.Title}
              onChange={handleChangeEdit}
            />
          </div>

          <div className="addclan_input">
            <label>Icon:</label>
            <br />
            <input type="file" name="Icon" onChange={handleFileChange} />
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
            <label>Selected Meta Tags:</label>
            <ul>
              {editTechnologies.Meta_tags.map((item, index) => (
                <li key={index}>
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
            <label>Selected Meta Keywords:</label>
            <ul>
              {editTechnologies.Meta_keyword.map((item, index) => (
                <li key={index}>
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
              value={editTechnologies.Meta_desc}
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
              value={editTechnologies.canonical_url}
              onChange={handleChangeEdit}
            />
          </div>

          <div className="add_clan_btn">
            <button onClick={handleEditTechnology}>Edit Technology</button>
          </div>
        </div>
      </main>
    </section>
  );
};

export default EditeTechnologies;
