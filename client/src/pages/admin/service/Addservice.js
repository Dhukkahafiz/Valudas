import React, { useEffect, useState } from "react";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

function Addservice() {
  const navigate = useNavigate();
  const [Technologies, setTechnologies] = useState([]);
  const [Service_pages, setService_pages] = useState([]);
  const [selectedTechnology, setSelectedTechnology] = useState();
  const [selectedServicePages, setSelectedServicePages] = useState();

  const [addservice, setAddService] = useState({
    Service_name: "",
    Service_icon: null,
    Service_tagline: "",
    Service_Title: "",
    short_desk: "",
    Long_desc: "",
    Service_page_image: null,
    Technologies: [],
    Service_pages: [],
    in_Service: 0,
    In_portfolio: 0,
    parent_id: "",
    Created_by: "",
    Created_by: "",
    Meta_tags: [],
    Meta_keyword: [],
    Meta_desc: "",
    canonical_url: "",
  });
  const [service, setService] = useState([]);

  //   handel change data add
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddService((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  //   handel filechange file  add
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setAddService((prevState) => ({
      ...prevState,
      [name]: files[0],
    }));
  };

  //  get service data
  const getservice = async () => {
    try {
      const response = await axios.get(`${API}/getperent`);

      setService(response.data);
    } catch (error) {
      console.error("Error fetching city list:", error);
    }
  };

  // CKEditor
  const handleEditorChange = (name) => (event, editor) => {
    const data = editor.getData();
    setAddService((prevState) => ({
      ...prevState,
      [name]: data,
    }));
  };

  // add data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      for (const key in addservice) {
        if (Array.isArray(addservice[key])) {
          formData.append(key, JSON.stringify(addservice[key]));
        } else if (addservice[key] instanceof File) {
          formData.append(key, addservice[key]);
        } else {
          formData.append(key, addservice[key]);
        }
      }

      const response = await axios.post(`${API}/addService`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        navigate("/dashboard/services");
      } else {
        console.error("Failed to add service:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  // get service data

  const getServiceData = () => {
    axios
      .get(`${API}/getservicepage`)
      .then((res) => setService_pages(res.data))
      .catch((error) => console.log(error));
  };

  // get techonologies data

  const getTechnologies = () => {
    axios
      .get(`${API}/getTechnologies`)
      .then((res) => setTechnologies(res.data))
      .catch((error) => console.log(error));
  };

  // Technologies data convert array

  const handleTechnologySelect = (e) => {
    const selected = e.target.value;
    if (selected && !addservice.Technologies.includes(selected)) {
      setAddService((prevState) => ({
        ...prevState,
        Technologies: [...prevState.Technologies, selected],
      }));
      setSelectedTechnology();
    }
  };

  const handleRemoveTechnology = (index) => {
    setAddService((prevState) => ({
      ...prevState,
      Technologies: prevState.Technologies.filter((_, i) => i !== index),
    }));
  };

  // service page  data convert array
  const handleServicePagesChange = (e) => {
    const selected = e.target.value;
    if (selected && !addservice.Service_pages.includes(selected)) {
      setAddService((prevState) => ({
        ...prevState,
        Service_pages: [...prevState.Service_pages, selected],
      }));
      setSelectedServicePages();
    }
  };

  const handleRemoveServicePage = (index) => {
    setAddService((prevState) => ({
      ...prevState,
      Service_pages: prevState.Service_pages.filter((_, i) => i !== index),
    }));
  };

  // meta tage
  const handleMetaTagsChange = (e) => {
    const value = e.target.value;
    if (e.key === "Enter" && value) {
      e.preventDefault();
      setAddService((prevState) => ({
        ...prevState,
        Meta_tags: [...prevState.Meta_tags, value.trim()],
      }));
      e.target.value = "";
    }
  };

  const handleRemoveMetaTag = (index) => {
    setAddService((prevState) => ({
      ...prevState,
      Meta_tags: prevState.Meta_tags.filter((_, i) => i !== index),
    }));
  };

  // meta keyword

  const handleMetaKeywordChange = (e) => {
    const value = e.target.value;
    if (e.key === "Enter" && value) {
      e.preventDefault();
      setAddService((prevState) => ({
        ...prevState,
        Meta_keyword: [...prevState.Meta_keyword, value.trim()],
      }));
      e.target.value = "";
    }
  };

  const handleRemoveMetaKeyword = (index) => {
    setAddService((prevState) => ({
      ...prevState,
      Meta_keyword: prevState.Meta_keyword.filter((_, i) => i !== index),
    }));
  };

  useEffect(() => {
    getServiceData();
    getservice();
    getTechnologies();

    const getUname = localStorage.getItem("id");
    console.log(getUname);
    const currentDate = new Date().toISOString();

    setAddService((prevData) => ({
      ...prevData,
      Created_by: getUname || "",
      Created_date: currentDate,
    }));
  }, []);

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    if (name === "in_Service") {
      setAddService((prevState) => ({
        ...prevState,
        in_Service: checked ? 1 : 0,
        In_portfolio: 0,
      }));
    } else if (name === "In_portfolio") {
      setAddService((prevState) => ({
        ...prevState,
        in_Service: 0,
        In_portfolio: checked ? 1 : 0,
      }));
    }
  };

  return (
    <>
      <section id="content">
        <main>
          <div className="head-title">
            <div className="left">
              <h1>Add New Service</h1>
            </div>
          </div>
          <div className="add_member" style={{ marginTop: "15px" }}>
            <form onSubmit={handleSubmit}>
              <div className="addclan_input">
                <label>Service Name:</label>
                <br />
                <input
                  type="text"
                  placeholder="Service Name"
                  name="Service_name"
                  value={addservice.Service_name}
                  onChange={handleChange}
                />
              </div>

              <div className="addclan_input">
                <label>Service Icon:</label>
                <br />
                <input
                  type="file"
                  name="Service_icon"
                  onChange={handleFileChange}
                />
              </div>

              <div className="addclan_input">
                <label>Service Tagline:</label>
                <br />
                <input
                  type="text"
                  placeholder="Service Tagline"
                  name="Service_tagline"
                  value={addservice.Service_tagline}
                  onChange={handleChange}
                />
              </div>

              <div className="addclan_input">
                <label>Service Title:</label>
                <br />
                <input
                  type="text"
                  placeholder="Service Title"
                  name="Service_Title"
                  value={addservice.Service_Title}
                  onChange={handleChange}
                />
              </div>

              <div className="addclan_input">
                <label>Short Description:</label>
                <br />
                <CKEditor
                  editor={ClassicEditor}
                  data={addservice.short_desk}
                  onChange={handleEditorChange("short_desk")}
                />
              </div>

              <div className="addclan_input">
                <label>Long Description:</label>
                <br />
                <CKEditor
                  editor={ClassicEditor}
                  data={addservice.Long_desc}
                  onChange={handleEditorChange("Long_desc")}
                />
              </div>

              <div className="addclan_input">
                <label>Service Page Image:</label>
                <br />
                <input
                  type="file"
                  name="Service_page_image"
                  onChange={handleFileChange}
                />
              </div>

              <div className="addclan_input">
                <label>Technologies :</label>
                <br />
                <select
                  style={{ width: "100%", padding: "10px", marginTop: "10px" }}
                  value={selectedTechnology}
                  onChange={handleTechnologySelect}
                >
                  <option value="">Select Technology</option>
                  {Technologies.map((data) => (
                    <option key={data.id} value={data.Title}>
                      {data.Title}
                    </option>
                  ))}
                </select>
                <div>
                  {addservice.Technologies.map((tech, index) => (
                    <span
                      key={index}
                      style={{ display: "inline-block", margin: "5px" }}
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => handleRemoveTechnology(index)}
                      >
                        x
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="addclan_input">
                <label>Service Pages :</label>
                <br />
                <select
                  style={{ width: "100%", padding: "10px", margin: "10px 0" }}
                  value={selectedServicePages}
                  onChange={handleServicePagesChange}
                >
                  <option value="">Select Service Page</option>
                  {Service_pages.map((data) => (
                    <option key={data.id} value={data.Service_name}>
                      {data.Service_name}
                    </option>
                  ))}
                </select>
                <div>
                  {addservice.Service_pages.map((page, index) => (
                    <span
                      key={index}
                      style={{ display: "inline-block", margin: "5px" }}
                    >
                      {page}
                      <button
                        type="button"
                        onClick={() => handleRemoveServicePage(index)}
                      >
                        x
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="addclan_input">
                <label>Meta_tags:</label>
                <br />
                <input
                  type="text"
                  placeholder="Add a tag and press Enter"
                  onKeyDown={handleMetaTagsChange}
                />
                <div>
                  {addservice.Meta_tags.map((tag, index) => (
                    <span
                      key={index}
                      style={{ display: "inline-block", margin: "5px" }}
                    >
                      {tag}{" "}
                      <button onClick={() => handleRemoveMetaTag(index)}>
                        x
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="addclan_input">
                <label>Meta_keywords:</label>
                <br />
                <input
                  type="text"
                  placeholder="Add a keyword and press Enter"
                  onKeyDown={handleMetaKeywordChange}
                />
                <div>
                  {addservice.Meta_keyword.map((keyword, index) => (
                    <span
                      key={index}
                      style={{ display: "inline-block", margin: "5px" }}
                    >
                      {keyword}
                      <button onClick={() => handleRemoveMetaKeyword(index)}>
                        x
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="addclan_input">
                <label>Meta_desc:</label>
                <br />
                <input
                  type="text"
                  placeholder="Meta_desc"
                  name="Meta_desc"
                  value={addservice.Meta_desc}
                  onChange={handleChange}
                />
              </div>

              <div className="addclan_input">
                <label>canonical_url:</label>
                <br />
                <input
                  type="text"
                  placeholder="canonical_url"
                  name="canonical_url"
                  value={addservice.canonical_url}
                  onChange={handleChange}
                />
              </div>
              <div className="addclan_input">
                <label>parent_id:</label>
                <br />
                <select
                  style={{ width: "100%", padding: "10px", margin: "10px 0" }}
                  value={addservice.parent_id}
                  name="parent_id"
                  onChange={handleChange}
                >
                  <option value="">Select Service Page</option>
                  <option value="0">
                    <b>parent</b>
                  </option>

                  {service.map((data) => (
                    <option key={data.id} value={data.id}>
                      {data.Service_name}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <div>
                  <label style={{ marginRight: "10px" }}>in_Service:</label>
                  <input
                    type="checkbox"
                    name="in_Service"
                    checked={addservice.in_Service === 1}
                    onChange={handleCheckboxChange}
                  />
                </div>
                <div>
                  <label style={{ marginRight: "10px" }}>In_portfolio:</label>
                  <input
                    type="checkbox"
                    name="In_portfolio"
                    checked={addservice.In_portfolio === 1}
                    onChange={handleCheckboxChange}
                  />
                </div>
              </div>

              <div className="add_clan_btn">
                <button type="submit">Add Service</button>
              </div>
            </form>
          </div>
        </main>
      </section>
    </>
  );
}

export default Addservice;
