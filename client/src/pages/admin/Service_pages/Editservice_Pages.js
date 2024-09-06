import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const API = process.env.REACT_APP_API_URL;

function EditService_Pages() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [editservice, seteditService] = useState({
    Service_name: "",
    Icon: null,
    Short_desc: "",
    long_Sec: "",
    Updated_date: "",
    Updated_by: "",
    Meta_tags: [],
    Meta_keyword: [],
    Meta_desc: "",
    canonical_url: "",
  });

  useEffect(() => {
    getServiceData(id);
  }, [id]);

  // get Service Data With Id

  const getServiceData = (id) => {
    axios
      .get(`${API}/getservicepageWithID/${id}`)
      .then((res) => {
        const data = res.data[0];
        seteditService({
          Service_name: data.Service_name || "",
          Icon: data.Icon || null,
          Short_desc: data.Short_desc || "",
          long_Sec: data.long_Sec || "",
          Meta_tags: Array.isArray(data.Meta_tags)
            ? data.Meta_tags
            : JSON.parse(data.Meta_tags || "[]"),
          Meta_keyword: Array.isArray(data.Meta_keyword)
            ? data.Meta_keyword
            : JSON.parse(data.Meta_keyword || "[]"),
          Meta_desc: data.Meta_desc || "",
          canonical_url: data.canonical_url || "",
        });
      })
      .catch((error) => {
        console.error("Error fetching service data:", error);
      });
  };

  // input HandleChane
  const handleChangeAdd = (e) => {
    const { name, value } = e.target;
    seteditService((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // file handleChange

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    seteditService((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };

  // put data
  const handleEditService = async () => {
    try {
      const formData = new FormData();
      for (let key in editservice) {
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

      const response = await axios.put(
        `${API}/EditServicepage/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        navigate("/dashboard/Service_pages");
      } else {
        console.error("Failed to update service:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  // Meta Tage Convert Array
  const handleMetaTagsChange = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = e.target.value.trim();
      if (value) {
        seteditService((prevState) => ({
          ...prevState,
          Meta_tags: [...prevState.Meta_tags, value],
        }));
        e.target.value = "";
      }
    }
  };

  const handleRemoveMetaTag = (index) => {
    seteditService((prevState) => ({
      ...prevState,
      Meta_tags: prevState.Meta_tags.filter((_, i) => i !== index),
    }));
  };

  // Meta KeyWord convert array
  const handleMetaKeywordChange = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = e.target.value.trim();
      if (value) {
        seteditService((prevState) => ({
          ...prevState,
          Meta_keyword: [...prevState.Meta_keyword, value],
        }));
        e.target.value = "";
      }
    }
  };

  const handleRemoveMetaKeyword = (index) => {
    seteditService((prevState) => ({
      ...prevState,
      Meta_keyword: prevState.Meta_keyword.filter((_, i) => i !== index),
    }));
  };

  // Handle changes to CKEditor
  const handleEditorChange = (name) => (event, editor) => {
    const data = editor.getData();
    seteditService((prevState) => ({
      ...prevState,
      [name]: data,
    }));
  };

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
            <div className="addclan_input">
              <label>Service_name:</label>
              <br />
              <input
                type="text"
                placeholder="Service_name"
                name="Service_name"
                value={editservice.Service_name}
                onChange={handleChangeAdd}
              />
            </div>
            <div
              style={{
                width: "100%",
                justifyContent: "space-between",
                marginTop: "15px",
              }}
            >
              <div className="addclan_input" style={{ width: "100%" }}>
                <label>Thumbnail:</label>
                <br />
                <input
                  type="file"
                  name="Icon"
                  onChange={handleFileChange}
                  style={{ border: "1px solid grey", borderRadius: "5px" }}
                />
              </div>
              <div className="addclan_input" style={{ width: "100%" }}>
                <label>Short_desc:</label>
                <br />

                <CKEditor
                  editor={ClassicEditor}
                  data={editservice.Short_desc}
                  onChange={handleEditorChange("Short_desc")}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                marginTop: "15px",
              }}
            ></div>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <div className="addclan_input" style={{ width: "100%" }}>
                <label>long_Sec:</label>
                <br />

                <CKEditor
                  editor={ClassicEditor}
                  data={editservice.long_Sec}
                  onChange={handleEditorChange("long_Sec")}
                />
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
                {Array.isArray(editservice.Meta_tags) &&
                  editservice.Meta_tags.map((tag, index) => (
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
                {Array.isArray(editservice.Meta_keyword) &&
                  editservice.Meta_keyword.map((keyword, index) => (
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
                onChange={handleChangeAdd}
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
                onChange={handleChangeAdd}
              />
            </div>

            <button onClick={handleEditService}>Update Service</button>
          </div>
        </main>
      </section>
    </>
  );
}

export default EditService_Pages;
