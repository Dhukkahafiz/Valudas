const fs = require("fs");
const path = require("path");
const connectDB = require("../database/connection");

// get tech stack code
const getTechStack = async (req, res) => {
  try {
    const Que = `SELECT * FROM technologies_`;
    connectDB.query(Que, (err, data) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ message: "error got from getting TechStack" });
      }
      return res.json(data);
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "intrnal server error " });
  }
};

// get per technology code
const getPerTechnologies = async (req, res) => {
  const q = "SELECT * FROM technologies_ WHERE id = ?";
  connectDB.query(q, [req.params.id], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.json(data);
  });
};


// add code
const postTechStack = async (req, res) => {
  try {
    const {
      Title,
      Meta_tags,
      Meta_keyword,
      Meta_desc,
      canonical_url,
      Created_date,
      Created_by,
    } = req.body;

    const Icon = req.files.Icon ? req.files.Icon[0].filename : null;

    const Que = `INSERT INTO technologies_ (Title ,Icon, Meta_tags, Meta_keyword, Meta_desc, canonical_url, Created_date,Created_by) VALUES (?,?,?,?,?,?,?,?)`;
    const data = [
      Title,
      Icon,
      Meta_tags,
      Meta_keyword,
      Meta_desc,
      canonical_url,
      Created_date,
      Created_by,
    ];

    connectDB.query(Que, data, (err) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ message: "error got from post techstack" });
      }

      return res.sendStatus(200);
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "internal server error" });
  }
};

// update code
const updateTechStack = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      Title,
      Meta_tags,
      Meta_keyword,
      Meta_desc,
      canonical_url,
      Updated_date,
      Updated_by,
    } = req.body;

    let Icon;

    if (req.files && req.files.Icon) {
      Icon = req.files.Icon[0].filename;
    } else {
      Icon = req.body.Icon || null;
    }

    const Que = `UPDATE technologies_ SET Title = ?, Icon =?, Meta_tags = ?, Meta_keyword = ?, Meta_desc = ?, canonical_url = ?, Updated_date = ?,Updated_by = ?  WHERE id = ?`;
    const data = [
      Title,
      Icon,
      Meta_tags,
      Meta_keyword,
      Meta_desc,
      canonical_url,
      Updated_date,
      Updated_by,
      id,
    ];

    connectDB.query(Que, data, (err) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ message: "error got from update teh stack" });
      }
      return res.sendStatus(200);
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "error got from update teh stack" });
  }
};

// delete code
const deleteTechnology = async (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM technologies_ WHERE id = ?";

  connectDB.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: "Error deleting item from the database" });
    } else {
      res.json({ message: "Item deleted successfully" });
    }
  });
};

module.exports = {
  getTechStack,
  getPerTechnologies,
  postTechStack,
  updateTechStack,
  deleteTechnology,
 
};
