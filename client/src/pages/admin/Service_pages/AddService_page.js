import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const API = process.env.REACT_APP_API_URL;

function AddService_page() {
  useEffect(() => {
    const getUname = localStorage.getItem("id");
    console.log(getUname);
    const currentDate = new Date().toISOString();

    setaddservice((prevData) => ({
      ...prevData,
      Created_by: getUname || "",
      Created_date: currentDate,
    }));
  }, []);

  const navigate = useNavigate();

  const [addservice, setaddservice] = useState({
    Service_name: "",
    Icon: null,
    Short_desc: "",
    long_Sec: "",
    Created_date: "",
    Created_by: "",
    Meta_tags: [],
    Meta_keyword: [],
    Meta_desc: "",
    canonical_url: "",
  });

  // Handle changes to text input fields
  const handleChangeAdd = (e) => {
    const { name, value } = e.target;
    setaddservice((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle changes to file input fields
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setaddservice((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };

  // Handle changes to CKEditor
  const handleEditorChange = (name) => (event, editor) => {
    const data = editor.getData();
    setaddservice((prevState) => ({
      ...prevState,
      [name]: data,
    }));
  };

  // Handle addition of meta tags
  const handleMetaTagsChange = (e) => {
    const value = e.target.value;
    if (e.key === "Enter" && value) {
      setaddservice((prevState) => ({
        ...prevState,
        Meta_tags: [...prevState.Meta_tags, value.trim()],
      }));
      e.target.value = ""; // Clear the input field
    }
  };

  const handleRemoveMetaTag = (index) => {
    setaddservice((prevState) => ({
      ...prevState,
      Meta_tags: prevState.Meta_tags.filter((_, i) => i !== index),
    }));
  };

  // Handle addition of meta keywords
  const handleMetaKeywordChange = (e) => {
    const value = e.target.value;
    if (e.key === "Enter" && value) {
      setaddservice((prevState) => ({
        ...prevState,
        Meta_keyword: [...prevState.Meta_keyword, value.trim()],
      }));
      e.target.value = "";
    }
  };

  const handleRemoveMetaKeyword = (index) => {
    setaddservice((prevState) => ({
      ...prevState,
      Meta_keyword: prevState.Meta_keyword.filter((_, i) => i !== index),
    }));
  };

  // Handle form submission to add a new service
  const handleAddService = async () => {
    try {
      const formData = new FormData();

      formData.append("Service_name", addservice.Service_name);
      formData.append("Icon", addservice.Icon);
      formData.append("Short_desc", addservice.Short_desc);
      formData.append("long_Sec", addservice.long_Sec);
      formData.append("Created_date", addservice.Created_date);
      formData.append("Created_by", addservice.Created_by);
      formData.append("Meta_tags", JSON.stringify(addservice.Meta_tags));
      formData.append("Meta_keyword", JSON.stringify(addservice.Meta_keyword));
      formData.append("Meta_desc", addservice.Meta_desc);
      formData.append("canonical_url", addservice.canonical_url);

      await axios.post(`${API}/addServicepage`, formData);

      setaddservice({
        Service_name: "",
        Icon: null,
        Short_desc: "",
        long_Sec: "",
        Created_date: "",
        Created_by: "",
        Meta_tags: [],
        Meta_keyword: [],
        Meta_desc: "",
        canonical_url: "",
      });

      navigate("/dashboard/Service_pages");
    } catch (error) {
      console.log("Error adding service:", error);
    }
  };

  return (
    <>
      <section id="content">
        <main>
          <div className="head-title">
            <div className="left">
              <h1>Add Service</h1>
            </div>
          </div>
          <div className="add_member" style={{ marginTop: "15px" }}>
            <div className="addclan_input">
              <label>Service Name:</label>
              <br />
              <input
                type="text"
                placeholder="Service Name"
                name="Service_name"
                value={addservice.Service_name}
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
                <label>Short Description:</label>
                <br />

                <CKEditor
                  editor={ClassicEditor}
                  data={addservice.Short_desc}
                  onChange={handleEditorChange("Short_desc")}
                />
              </div>
            </div>

            <div
              style={{
                width: "100%",
                justifyContent: "space-between",
                marginTop: "15px",
              }}
            >
              <div className="addclan_input" style={{ width: "100%" }}>
                <label>Long Description:</label>
                <br />
                <CKEditor
                  editor={ClassicEditor}
                  data={addservice.long_Sec}
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
                value={addservice.canonical_url}
                onChange={handleChangeAdd}
              />
            </div>

            <div className="add_clan_btn">
              <button onClick={handleAddService}>Add Service</button>
            </div>
          </div>
        </main>
      </section>
    </>
  );
}

export default AddService_page;
