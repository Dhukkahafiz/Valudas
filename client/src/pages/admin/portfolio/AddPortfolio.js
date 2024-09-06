import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

const AddPortfolio = () => {
  const [addPortfolio, setAddPortfolio] = useState({
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
    Created_date: new Date().toISOString(),
    Created_by: "",
  });

  const [Industries, setIndustries] = useState([]);
  const [Technologies, setTechnologies] = useState([]);
  const [services, setServices] = useState([]);
  const [servicesPage, setServicesPage] = useState([]);

  useEffect(() => {
    fetchIndustries();
    fetchTechnologies();
    fetchServices();
  }, []);

  const navigate = useNavigate();


//   get service data  

  const fetchServices = async () => {
    try {
      const res = await axios.get(`${API}/getservice`);
      const resp = await axios.get(`${API}/getservicepage`);
      setServices(res.data);
      setServicesPage(resp.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

//   get industry
  const fetchIndustries = async () => {
    try {
      const res = await axios.get(`${API}/getIndustries`);
      setIndustries(res.data);
    } catch (error) {
      console.error("Error fetching industries:", error);
    }
  };


//   get technology
  const fetchTechnologies = async () => {
    try {
      const res = await axios.get(`${API}/getTechnologies`);
      setTechnologies(res.data);
    } catch (error) {
      console.error("Error fetching technologies:", error);
    }
  };


//   input handle change 

  const handleChangeAdd = (e) => {
    const { name, value } = e.target;
    if (
      (name === "Industries" ||
        name === "Technologies" ||
        name === "services") &&
      value
    ) {
      if (!addPortfolio[name].includes(value)) {
        setAddPortfolio((prevData) => ({
          ...prevData,
          [name]: [...prevData[name], value],
        }));
      }
    } else {
      setAddPortfolio((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleRemoveItem = (name, value) => {
    setAddPortfolio((prevData) => ({
      ...prevData,
      [name]: prevData[name].filter((item) => item !== value),
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setAddPortfolio((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };


//   ck Editer
  const handleEditorChange = (name) => (event, editor) => {
    const data = editor.getData();
    setAddPortfolio((prevData) => ({
      ...prevData,
      [name]: data,
    }));
  };

// Meta Tage Convert Array

  const handleMetaInputChange = (e) => {
    const { name, value } = e.target;
    if (value && !addPortfolio[name].includes(value)) {
      setAddPortfolio((prevData) => ({
        ...prevData,
        [name]: [...prevData[name], value],
      }));
    }
    e.target.value = "";
  };


//   submit Data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("Thumbnail", addPortfolio.Thumbnail);
      formData.append("Company_name", addPortfolio.Company_name);
      formData.append("Title", addPortfolio.Title);
      formData.append("Short_desc", addPortfolio.Short_desc);
      formData.append("long_Desc", addPortfolio.long_Desc);
      formData.append("Industries", JSON.stringify(addPortfolio.Industries));
      formData.append("services", JSON.stringify(addPortfolio.services));
      formData.append(
        "Technologies",
        JSON.stringify(addPortfolio.Technologies)
      );
      formData.append("Meta_tags", JSON.stringify(addPortfolio.Meta_tags));
      formData.append(
        "Meta_keyword",
        JSON.stringify(addPortfolio.Meta_keyword)
      );
      formData.append("Meta_desc", addPortfolio.Meta_desc);
      formData.append("canonical_url", addPortfolio.canonical_url);
      const getUname = localStorage.getItem("id");
      formData.append("Created_by", getUname);
      formData.append("Created_date", new Date().toISOString());

      await axios.post(`${API}/addPortfolio`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setAddPortfolio({
        Thumbnail: null,
        Company_name: "",
        Title: "",
        Short_desc: "",
        long_Desc: "",
        Industries: [],
        services: [], // Reset to an empty array
        Technologies: [],
        Meta_tags: [],
        Meta_keyword: [],
        Meta_desc: "",
        canonical_url: "",
        Created_date: new Date().toISOString(),
      });
      navigate("/dashboard/portfolio");
    } catch (error) {
      console.error("Error adding portfolio:", error);
    }
  };

  return (
    <section id="content">
      <main>
        <div className="add_clan">
          <div className="add_clan_title">
            <h1>Add New Portfolio</h1>
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
              value={addPortfolio.Company_name}
              onChange={handleChangeAdd}
            />
          </div>

          <div className="addclan_input">
            <label>Title:</label>
            <br />
            <input
              type="text"
              name="Title"
              value={addPortfolio.Title}
              onChange={handleChangeAdd}
            />
          </div>

          <div className="addclan_input">
            <label>Short Description:</label>
            <br />
            <CKEditor
              editor={ClassicEditor}
              data={addPortfolio.Short_desc}
              onChange={handleEditorChange("Short_desc")}
            />
          </div>

          <div className="addclan_input">
            <label>Long Description:</label>
            <br />
            <CKEditor
              editor={ClassicEditor}
              data={addPortfolio.long_Desc}
              onChange={handleEditorChange("long_Desc")}
            />
          </div>

          <div className="addclan_input">
            <label>Industries:</label>
            <br />
            <select
              style={{ width: "100%", padding: "10px" }}
              name="Industries"
              value=""
              onChange={handleChangeAdd}
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
            <ul>
              {addPortfolio.Industries.map((industry, index) => (
                <li key={index}>
                  <div>{industry}</div>
                  <button
                    onClick={() => handleRemoveItem("Industries", industry)}
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
            <label>Services:</label>
            <br />
            <select
              style={{ width: "100%", padding: "10px" }}
              name="services"
              value=""
              onChange={handleChangeAdd}
            >
              <option value="">Select Service</option>
              {services.map((data) => (
                <option key={data.id} value={data.Service_name}>
                  {data.Service_name}
                </option>
              ))}

              {servicesPage.map((data) => (
                <option key={data.id} value={data.Service_name}>
                  {data.Service_name}
                </option>
              ))}
            </select>
          </div>

          <div className="selected_items">
            <ul>
              {addPortfolio.services.map((service, index) => (
                <li key={index}>
                  <div>{service}</div>
                  <button onClick={() => handleRemoveItem("services", service)}>
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
              value=""
              onChange={handleChangeAdd}
            >
              <option value="">Select Technology</option>
              {Technologies.map((data) => (
                <option key={data.id} value={data.Title}>
                  {data.Title}
                </option>
              ))}
            </select>
          </div>

          {/* Display selected technologies */}
          <div className="selected_items">
            <ul>
              {addPortfolio.Technologies.map((technology, index) => (
                <li key={index}>
                  <div>{technology}</div>
                  <button
                    onClick={() => handleRemoveItem("Technologies", technology)}
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

          {/* Display added Meta Tags */}
          <div className="selected_items">
            <ul>
              {addPortfolio.Meta_tags.map((tag, index) => (
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
              {addPortfolio.Meta_keyword.map((keyword, index) => (
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
              value={addPortfolio.Meta_desc}
              onChange={handleChangeAdd}
            />
          </div>

          <div className="addclan_input">
            <label>Canonical URL:</label>
            <br />
            <input
              type="text"
              name="canonical_url"
              value={addPortfolio.canonical_url}
              onChange={handleChangeAdd}
            />
          </div>

          <div className="add_clan_btn">
            <button onClick={handleSubmit}>Add Portfolio</button>
          </div>
        </div>
      </main>
    </section>
  );
};

export default AddPortfolio;
