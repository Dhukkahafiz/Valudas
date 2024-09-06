const fs = require("fs");
const path = require("path");
const connectDB = require("../database/connection");

// Getting portfolio data
const getPortfolio = (req, res) => {
  const query = `SELECT * FROM portfolio_ `;

  connectDB.query(query, (err, results) => {
    if (err) {
      console.error("Error executing SQL query: " + err.message);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
};

// get industries
const getIndustries = (req, res) => {
  const query = `SELECT * FROM industries`;

  connectDB.query(query, (err, results) => {
    if (err) {
      console.error("Error executing SQL query: " + err.message);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
};

// get technology
const getTechnologies = (req, res) => {
  const query = `SELECT * FROM technologies_`;

  connectDB.query(query, (err, results) => {
    if (err) {
      console.error("Error executing SQL query: " + err.message);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
};

// get portfolio
const getPerPortfolio = async (req, res) => {
  const q = "SELECT * FROM portfolio_ WHERE id = ?";
  connectDB.query(q, [req.params.id], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.json(data);
  });
};

// add portfolio
const addPortfolio = async (req, res) => {
  try {
    const {
      Company_name,
      Title,
      Short_desc,
      long_Desc,
      Industries,
      Technologies,
      Meta_tags,
      Meta_keyword,
      Meta_desc,
      canonical_url,
      Created_date,
      Created_by,
    } = req.body;
    console.log(req.body);

    if (!req.files || !req.files.Thumbnail) {
      return res.status(400).send("Thumbnail is required");
    }

    const filename = req.files.Thumbnail[0].filename;

    const sql =
      "INSERT INTO portfolio_ (Thumbnail, Company_name, Title, Short_desc, long_Desc, Industries, Technologies, Meta_tags, Meta_keyword, Meta_desc, canonical_url, Created_date, Created_by ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      filename,
      Company_name,
      Title,
      Short_desc,
      long_Desc,
      Industries,
      Technologies,
      Meta_tags,
      Meta_keyword,
      Meta_desc,
      canonical_url,
      Created_date,
      Created_by,
    ];

    await connectDB.query(sql, values);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error Adding Data", error);
    res.status(500).send("Internal Server Error");
  }
};

// Updating portfolio
const updatePortfolio = async (req, res) => {
  const { id } = req.params;
  const {
    Company_name,
    Title,
    Short_desc,
    long_Desc,
    Industries,
    services,
    Technologies,
    Meta_tags,
    Meta_keyword,
    Meta_desc,
    canonical_url,
    Updated_date,
    Updated_by,
  } = req.body;

  let Thumbnail;

  if (req.files && req.files.Thumbnail) {
    Thumbnail = req.files.Thumbnail[0].filename;
  } else {
    Thumbnail = req.body.Thumbnail || null;
  }
  try {
    const sql = `
          UPDATE portfolio_ SET 
              Company_name = ?, 
              Title = ?, 
              Short_desc = ?, 
              long_Desc = ?, 
              Industries = ?, 
              services = ?, 

              Technologies = ?,
              Thumbnail = ?,
              Meta_tags = ?,
              Meta_keyword = ?,
              Meta_desc = ?,
              canonical_url = ?,
              Updated_date = ?,
              Updated_by = ?


          WHERE id = ?
      `;

    const values = [
      Company_name,
      Title,
      Short_desc,
      long_Desc,
      Industries,
      services,
      Technologies,
      Thumbnail,
      Meta_tags,
      Meta_keyword,
      Meta_desc,
      canonical_url,
      Updated_date,
      Updated_by,
      id,
    ];

    // Execute the query
    await connectDB.query(sql, values);

    res.status(200).json({ message: "Portfolio updated successfully" });
  } catch (error) {
    console.error("Error updating portfolio:", error);
    res.status(500).json({ error: "Failed to update portfolio" });
  }
};

// deleting portfolio
const deletePortfolio = async (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM portfolio_ WHERE id = ?";

  connectDB.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: "Error deleting item from the database" });
    } else {
      res.json({ message: "Item deleted successfully" });
    }
  });
};

module.exports = {
  getPortfolio,
  getIndustries,
  getTechnologies,
  getPerPortfolio,
  addPortfolio,
  updatePortfolio,
  deletePortfolio,
};
