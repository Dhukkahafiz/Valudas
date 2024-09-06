import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

const AddTechnologies = () => {
  const [addTechnologies, setAddTechnologies] = useState({
    Title: "",
    Icon: null,
    Meta_tags: [],
    Meta_keyword: [],
    Meta_desc: "",
    canonical_url: "",
    Created_date: new Date().toISOString(),
  });

  const navigate = useNavigate();


  // handleChangeAdd
  const handleChangeAdd = (e) => {
    const { name, value } = e.target;
    setAddTechnologies((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
// handleFileChange
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setAddTechnologies((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };


  // Meta Tage Data Convert Array 

  const handleMetaInputChange = (e) => {
    const { name, value } = e.target;
    if (value && !addTechnologies[name].includes(value)) {
      setAddTechnologies((prevData) => ({
        ...prevData,
        [name]: [...prevData[name], value],
      }));
    }
    e.target.value = ""; // Clear the input after adding
  };

  const handleRemoveItem = (name, value) => {
    setAddTechnologies((prevData) => ({
      ...prevData,
      [name]: prevData[name].filter((item) => item !== value),
    }));
  };

// Submit data 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("Title", addTechnologies.Title);
      formData.append("Icon", addTechnologies.Icon);
      formData.append("Meta_tags", JSON.stringify(addTechnologies.Meta_tags));
      formData.append(
        "Meta_keyword",
        JSON.stringify(addTechnologies.Meta_keyword)
      );
      formData.append("Meta_desc", addTechnologies.Meta_desc);
      formData.append("canonical_url", addTechnologies.canonical_url);
      const getUname = localStorage.getItem("id");
      formData.append("Created_by", getUname);
      formData.append("Created_date", new Date().toISOString());

      await axios.post(`${API}/poststack`, formData);
      setAddTechnologies({
        Title: "",
        Icon: null,
        Meta_tags: [],
        Meta_keyword: [],
        Meta_desc: "",
        canonical_url: "",
        Created_date: new Date().toISOString(),
      });
      navigate("/dashboard/technologies");
    } catch (error) {
      console.error("Error adding technology:", error);
    }
  };

  return (
    <section id="content">
      <main>
        <div className="add_clan">
          <div className="add_clan_title">
            <h1>Add New Technology</h1>
          </div>

          <div className="addclan_input">
            <label>Title :</label>
            <br />
            <input
              type="text"
              placeholder="Title"
              name="Title"
              value={addTechnologies.Title}
              onChange={handleChangeAdd}
            />
          </div>

          <div className="addclan_input">
            <label>Icon :</label>
            <br />
            <input type="file" name="Icon" onChange={handleFileChange} />
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

          {/* Display added Meta Tags */}
          <div className="selected_items">
            <ul>
              {addTechnologies.Meta_tags.map((tag, index) => (
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

          {/* Display added Meta Keywords */}
          <div className="selected_items">
            <ul>
              {addTechnologies.Meta_keyword.map((keyword, index) => (
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
              value={addTechnologies.Meta_desc}
              onChange={handleChangeAdd}
            />
          </div>

          <div className="addclan_input">
            <label>Canonical URL:</label>
            <br />
            <input
              type="text"
              name="canonical_url"
              value={addTechnologies.canonical_url}
              onChange={handleChangeAdd}
            />
          </div>

          <div className="add_clan_btn">
            <button onClick={handleSubmit}>Add Technology</button>
          </div>
        </div>
      </main>
    </section>
  );
};

export default AddTechnologies;
