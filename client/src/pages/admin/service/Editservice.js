import React, { useEffect, useState } from "react";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useNavigate, useParams } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

function Editservice() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [Technologies, setTechnologies] = useState([]);
  const [Service_pages, setService_pages] = useState([]);
  const [selectedTechnology, setSelectedTechnology] = useState("");
  const [selectedServicePages, setSelectedServicePages] = useState("");

  const [editservice, setEditService] = useState({
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

    Updated_date: "",
    Updated_by: "",

    Meta_tags: [],
    Meta_keyword: [],
    Meta_desc: "",
    canonical_url: "",
  });

  console.log(editservice);
  const [service, setService] = useState([]);

  // get data
  const getservice = async () => {
    try {
      const response = await axios.get(`${API}/getperent`);

      setService(response.data);
    } catch (error) {
      console.error("Error fetching city list:", error);
    }
  };

  //  get service data with id
  const getServiceDatawithid = async (id) => {
    try {
      const response = await axios.get(`${API}/getservice/${id}`);
      const data = response.data[0];
      setEditService({
        Service_name: data.Service_name || "",
        Service_icon: data.Service_icon || null,
        Service_tagline: data.Service_tagline || "",
        Service_Title: data.Service_Title || "",
        short_desk: data.short_desk || "",
        Long_desc: data.Long_desc || "",
        Service_page_image: data.Service_page_image || null,
        Technologies: Array.isArray(data.Technologies)
          ? data.Technologies
          : JSON.parse(data.Technologies || "[]"),
        Service_pages: Array.isArray(data.Service_pages)
          ? data.Service_pages
          : JSON.parse(data.Service_pages || "[]"),
        in_Service: data.in_Service || 0,
        In_portfolio: data.In_portfolio || 0,
        parent_id: data.parent_id || "",
        Meta_tags: Array.isArray(data.Meta_tags)
          ? data.Meta_tags
          : JSON.parse(data.Meta_tags || "[]"),
        Meta_keyword: Array.isArray(data.Meta_keyword)
          ? data.Meta_keyword
          : JSON.parse(data.Meta_keyword || "[]"),
        Meta_desc: data.Meta_desc || "",
        canonical_url: data.canonical_url || "",
      });
    } catch (error) {
      console.error("Error fetching service data:", error);
    }
  };

  // hendle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditService((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  // hendke file change

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setEditService((prevState) => ({
      ...prevState,
      [name]: files[0],
    }));
  };

  // ck editer
  const handleEditorChange = (name) => (event, editor) => {
    const data = editor.getData();
    setEditService((prevState) => ({
      ...prevState,
      [name]: data,
    }));
  };

  // put data
  const handleupdate = async (e) => {
    e.preventDefault();

    try {
      console.log(editservice);
      const formData = new FormData();
      for (const key in editservice) {
        if (Array.isArray(editservice[key])) {
          formData.append(key, JSON.stringify(editservice[key]));
        } else if (editservice[key] instanceof File) {
          formData.append(key, editservice[key]);
        } else {
          formData.append(key, editservice[key]);
        }
      }
      const getUname = localStorage.getItem("id");
      console.log(getUname);
      formData.append("Updated_date", new Date().toISOString());
      formData.append("Updated_by", getUname);

      const response = await axios.put(`${API}/editService/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        navigate("/dashboard/services");
      } else {
        console.error("Failed to update service:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  // get service data

  const getServiceData = () => {
    axios
      .get(`${API}/getservicepage`)
      .then((res) => setService_pages(res.data))
      .catch((error) => console.log(error));
  };

  //  get technologis data
  const getTechnologies = () => {
    axios
      .get(`${API}/getTechnologies`)
      .then((res) => setTechnologies(res.data))
      .catch((error) => console.log(error));
  };

  // Technologies convert Array
  const handleTechnologySelect = (e) => {
    const selected = e.target.value;
    if (selected && !editservice.Technologies.includes(selected)) {
      setEditService((prevState) => ({
        ...prevState,
        Technologies: [...prevState.Technologies, selected],
      }));
      setSelectedTechnology("");
    }
  };
  const handleRemoveTechnology = (index) => {
    setEditService((prevState) => ({
      ...prevState,
      Technologies: prevState.Technologies.filter((_, i) => i !== index),
    }));
  };

  // service page  convert Array
  const handleServicePagesChange = (e) => {
    const selected = e.target.value;
    if (selected && !editservice.Service_pages.includes(selected)) {
      setEditService((prevState) => ({
        ...prevState,
        Service_pages: [...prevState.Service_pages, selected],
      }));
      setSelectedServicePages("");
    }
  };

  const handleRemoveServicePage = (index) => {
    setEditService((prevState) => ({
      ...prevState,
      Service_pages: prevState.Service_pages.filter((_, i) => i !== index),
    }));
  };

  // Meta Tage   Convert Array

  const handleMetaTagsChange = (e) => {
    const value = e.target.value;
    if (e.key === "Enter" && value) {
      e.preventDefault();
      setEditService((prevState) => ({
        ...prevState,
        Meta_tags: [...prevState.Meta_tags, value.trim()],
      }));
      e.target.value = "";
    }
  };

  const handleRemoveMetaTag = (index) => {
    setEditService((prevState) => ({
      ...prevState,
      Meta_tags: prevState.Meta_tags.filter((_, i) => i !== index),
    }));
  };

  // Meta Keyword Convert Array
  const handleMetaKeywordChange = (e) => {
    const value = e.target.value;
    if (e.key === "Enter" && value) {
      e.preventDefault();
      setEditService((prevState) => ({
        ...prevState,
        Meta_keyword: [...prevState.Meta_keyword, value.trim()],
      }));
      e.target.value = "";
    }
  };

  const handleRemoveMetaKeyword = (index) => {
    setEditService((prevState) => ({
      ...prevState,
      Meta_keyword: prevState.Meta_keyword.filter((_, i) => i !== index),
    }));
  };

  //handleCheckboxChange

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    if (name === "in_Service") {
      setEditService((prevState) => ({
        ...prevState,
        in_Service: checked ? "1" : "0",
        In_portfolio: "0",
      }));
    } else if (name === "In_portfolio") {
      setEditService((prevState) => ({
        ...prevState,
        in_Service: "0",
        In_portfolio: checked ? "1" : "0",
      }));
    }
  };

  useEffect(() => {
    getServiceData();
    getTechnologies();
    getservice();
    getServiceDatawithid(id);
  }, [id]);

  return (
    <>
      <section id="content">
        <main>
          <div className="head-title">
            <div className="left">
              <h1>Edit Service</h1>
            </div>
          </div>
          <div className="add_member" style={{ marginTop: "15px" }}>
            <form onSubmit={handleupdate}>
              <div className="addclan_input">
                <label>Service Name:</label>
                <br />
                <input
                  type="text"
                  placeholder="Service Name"
                  name="Service_name"
                  value={editservice.Service_name}
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
                  value={editservice.Service_tagline}
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
                  value={editservice.Service_Title}
                  onChange={handleChange}
                />
              </div>

              <div className="addclan_input">
                <label>Short Description:</label>
                <br />
                <CKEditor
                  editor={ClassicEditor}
                  data={editservice.short_desk}
                  onChange={handleEditorChange("short_desk")}
                />
              </div>

              <div className="addclan_input">
                <label>Long Description:</label>
                <br />
                <CKEditor
                  editor={ClassicEditor}
                  data={editservice.Long_desc}
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
                <label>Technologies:</label>
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
                  {editservice.Technologies.map((tech, index) => (
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
                <label>Service Pages:</label>
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
                  {editservice.Service_pages.map((page, index) => (
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
                  {editservice.Meta_tags.map((tag, index) => (
                    <span
                      key={index}
                      style={{ display: "inline-block", margin: "5px" }}
                    >
                      {tag}
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
                  {editservice.Meta_keyword.map((keyword, index) => (
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
                  value={editservice.Meta_desc}
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
                  value={editservice.canonical_url}
                  onChange={handleChange}
                />
              </div>

              <div className="addclan_input">
                <label>Parent ID:</label>
                <br />
                <select
                  style={{ width: "100%", padding: "10px", margin: "10px 0" }}
                  value={editservice.parent_id}
                  name="parent_id"
                  onChange={handleChange}
                >
                  <option value="">Select Parent</option>
                  <option value="0">
                    <b>Parent</b>
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
                    checked={editservice.in_Service === "1"}
                    onChange={handleCheckboxChange}
                  />
                </div>
                <div>
                  <label style={{ marginRight: "10px" }}>In_portfolio:</label>
                  <input
                    type="checkbox"
                    name="In_portfolio"
                    checked={editservice.In_portfolio === "1"}
                    onChange={handleCheckboxChange}
                  />
                </div>
              </div>

              <div className="add_clan_btn">
                <button type="submit">Update Service</button>
              </div>
            </form>
          </div>
        </main>
      </section>
    </>
  );
}

export default Editservice;
