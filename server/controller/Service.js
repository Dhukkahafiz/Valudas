const connectDB = require("../database/connection");

// get data
const getService = async (req, res) => {
  try {
    const Que = `SELECT * FROM service_ `;
    connectDB.query(Que, (err, data) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ message: "error got from getting industries" });
      }
      return res.json(data);
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "intrnal server error " });
  }
};

// get service data with perents id
const getServicewithperent = async (req, res) => {
  try {
    const Que = `SELECT * FROM service_ WHERE parent_id = "0"`;
    connectDB.query(Que, (err, data) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ message: "error got from getting industries" });
      }
      return res.json(data);
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "intrnal server error " });
  }
};

// get service data with id

const getServicewithid = (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM service_ WHERE id = ?`;
  connectDB.query(sql, [id], (error, result) => {
    if (error) {
      console.error("Error Getting Data from service_ Table:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Service not found" });
    }
    return res.json(result);
  });
};

//  add service data

const addservice = (req, res) => {
  const {
    Service_name,
    Service_tagline,
    Service_Title,
    short_desk,
    Long_desc,
    Technologies,
    Service_pages,
    in_Service,
    In_portfolio,
    parent_id,
    Created_date,
    Created_by,
    Meta_tags,
    Meta_keyword,
    Meta_desc,
    canonical_url,
  } = req.body;
  console.log(req.body);

  const Service_icon = req.files["Service_icon"][0]?.filename || null;
  const Service_page_image =
    req.files["Service_page_image"][0]?.filename || null;

  const sql = `INSERT INTO service_ (
        Service_name,
        Service_icon,
        Service_tagline,
        Service_Title,
        short_desk,
        Long_desc,
        Service_page_image,
        Technologies,
        Service_pages,
         in_Service,
    In_portfolio,
    parent_id,
    Created_date,
    Created_by,
<<<<<<< HEAD
    Meta_tags,
=======
        Meta_tags,
>>>>>>> 7f0bd4d54ae5eacb9abb139c7f27365c3f6c7442
    Meta_keyword,
    Meta_desc,
    canonical_url
    ) VALUES (?, ?, ?,?,?,?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    Service_name,
    Service_icon,
    Service_tagline,
    Service_Title,
    short_desk,
    Long_desc,
    Service_page_image,
    Technologies,
    Service_pages,
    in_Service,
    In_portfolio,
    parent_id,
    Created_date,
    Created_by,
    Meta_tags,
    Meta_keyword,
    Meta_desc,
    canonical_url,
  ];

  connectDB.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error adding service:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(200).json({
      message: "Service added successfully",
      serviceId: result.insertId,
    });
  });
};

// update serive data
const updateService = (req, res) => {
  const {
    Service_name,
    Service_tagline,
    Service_Title,
    short_desk,
    Long_desc,
    Technologies,
    Service_pages,
    in_Service,
    In_portfolio,
    parent_id,
    Updated_date,
    Updated_by,
    Meta_tags,
    Meta_keyword,
    Meta_desc,
    canonical_url,
  } = req.body;
  let serviceId = req.params.id;
  console.log(req.body);

  // Handle file uploads if they exist
  const Service_icon =
    req.files && req.files["Service_icon"]
      ? req.files["Service_icon"][0]?.filename
      : req.body.Service_icon;

  const Service_page_image =
    req.files && req.files["Service_page_image"]
      ? req.files["Service_page_image"][0]?.filename
      : req.body.Service_page_image;

  if (!serviceId) {
    return res.status(400).json({ error: "Service ID is required" });
  }

  const sql = `UPDATE service_ SET
    Service_name = ?, 
    Service_icon = ?, 
    Service_tagline = ?, 
    Service_Title = ?, 
    short_desk = ?, 
    Long_desc = ?, 
    Service_page_image = ?, 
    Technologies = ?, 
    Service_pages = ?,
    in_Service = ?, 
    In_portfolio = ?, 
    parent_id = ?, 
      Updated_date = ?, 
        Updated_by = ?, 
    Meta_tags = ?, 
    Meta_keyword = ?, 
    Meta_desc = ?, 
    canonical_url = ?
    WHERE id = ?`;

  // Values array to be used with the SQL query
  const values = [
    Service_name || null,
    Service_icon || null,
    Service_tagline || null,
    Service_Title || null,
    short_desk || null,
    Long_desc || null,
    Service_page_image || null,
    Technologies || null,
    Service_pages || null,
    in_Service || null,
    In_portfolio || null,
    parent_id || null,
    Updated_date || null,
    Updated_by || null,
    Meta_tags || null,
    Meta_keyword || null,
    Meta_desc || null,
    canonical_url || null,
    serviceId,
  ];

  // Execute the SQL query
  connectDB.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating service:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.status(200).json({
      message: "Service updated successfully",
    });
  });
};

// delete service data
const deleteServiceData = (req, res) => {
  let id = req.params.id;
  let sql = `DELETE FROM service_ WHERE id = ${id}`;
  connectDB.query(sql, (error) => {
    if (error) {
      console.log("Error Delete course_category Data in server.js" + error);
    }
    res.sendStatus(200);
  });
};

module.exports = {
  getService,
  getServicewithid,
  addservice,
  deleteServiceData,
  updateService,
  getServicewithperent,
};
