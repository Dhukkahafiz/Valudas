const connectDB = require("../database/connection");
const fs = require("fs");
const path = require("path");

// get service page

const getServices_pages = async (req, res) => {
  try {
    const Que = `SELECT * FROM service_pages_`;
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

// get service page  with id
const getServicewithid = (req, res) => {
  let id = req.params.id;
  let sql = `SELECT * FROM service_pages_ WHERE id = ${id}`;
  connectDB.query(sql, (error, result) => {
    if (error) {
      console.log(
        "Error Getting Data course_category Table in server.js" + error
      );
    }
    return res.json(result);
  });
};

//  add service page

const addService_pages = async (req, res) => {
  try {
    const {
      Service_name,
      Short_desc,
      long_Sec,
      Created_date,
      Created_by,
      Meta_tags,
      Meta_keyword,
      Meta_desc,
      canonical_url,
    } = req.body;
    const imagePath = req.file ? req.file.filename : null;

    const sql =
      "INSERT INTO service_pages_ (Service_name, Icon, Short_desc, long_Sec,Created_date,Created_by,Meta_tags,Meta_keyword,Meta_desc,canonical_url) VALUES (?, ?, ?, ?,?, ?,?,?,?,?)";
    const values = [
      Service_name,
      imagePath,
      Short_desc,
      long_Sec,
      Created_date,
      Created_by,
      Meta_tags,
      Meta_keyword,
      Meta_desc,
      canonical_url,
    ];

    await connectDB.query(sql, values, (err, results) => {
      if (err) {
        console.error("Error Adding Data", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      return res.sendStatus(200);
    });
  } catch (error) {
    console.error("Error Adding Data", error);
    res.status(500).send("Internal Server Error");
  }
};

// edit service page

const editservice = (req, res) => {
  const id = req.params.id;
  const {
    Service_name,
    Short_desc,
    long_Sec,
    Updated_date,
    Updated_by,
    Meta_tags,
    Meta_keyword,
    Meta_desc,
    canonical_url,
  } = req.body;
  console.log(req.body);
  const imagePath = req.file ? req.file.filename : null;

  // Convert JSON strings to arrays if necessary
  let metaTagsArray = [];
  let metaKeywordsArray = [];

  try {
    if (Meta_tags) {
      metaTagsArray = JSON.parse(Meta_tags);
    }
    if (Meta_keyword) {
      metaKeywordsArray = JSON.parse(Meta_keyword);
    }
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Invalid JSON format in Meta_tags or Meta_keyword" });
  }

  let sql, values;

  if (imagePath) {
    sql = `
      UPDATE service_pages_ 
      SET Service_name = ?, Icon = ?, Short_desc = ?, long_Sec = ?,Updated_date = ?,Updated_by = ?, Meta_tags = ?, Meta_keyword = ?, Meta_desc = ?, canonical_url = ?
      WHERE id = ?`;
    values = [
      Service_name,
      imagePath,
      Short_desc,
      long_Sec,
      Updated_date,
      Updated_by,

      JSON.stringify(metaTagsArray),
      JSON.stringify(metaKeywordsArray),
      Meta_desc,
      canonical_url,
      id,
    ];
  } else {
    sql = `
      UPDATE service_pages_ 
      SET Service_name = ?, Short_desc = ?, long_Sec = ?,Updated_date = ?,Updated_by = ?,  Meta_tags = ?, Meta_keyword = ?, Meta_desc = ?, canonical_url = ?
      WHERE id = ?`;
    values = [
      Service_name,
      Short_desc,
      long_Sec,
      Updated_date,
      Updated_by,

      JSON.stringify(metaTagsArray),
      JSON.stringify(metaKeywordsArray),
      Meta_desc,
      canonical_url,
      id,
    ];
  }

  connectDB.query(sql, values, (error) => {
    if (error) {
      console.log("Error updating data in service_pages_ table", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.sendStatus(200);
  });
};

// delete service page

const deleteServiceData = (req, res) => {
  let id = req.params.id;
  let sql = `DELETE FROM service_pages_ WHERE id = ${id}`;
  connectDB.query(sql, (error) => {
    if (error) {
      console.log("Error Delete course_category Data in server.js" + error);
    }
    res.sendStatus(200);
  });
};

module.exports = {
  getServices_pages,
  addService_pages,
  getServicewithid,
  editservice,
  deleteServiceData,
};
