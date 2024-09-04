const connectDB = require("../database/connection");

// getreview
const getReview = (req, res) => {
  const query = `SELECT * FROM reviews_ `;

  connectDB.query(query, (err, results) => {
    if (err) {
      console.error("Error executing SQL query: " + err.message);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
};

// getperreview code
const getPerReview = async (req, res) => {
  const q = "SELECT * FROM reviews_ WHERE id = ?";
  connectDB.query(q, [req.params.id], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.json(data);
  });
};

// getportfolio code
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

// get servies code
const getServies = (req, res) => {
  const query = `SELECT * FROM service_ `;

  connectDB.query(query, (err, results) => {
    if (err) {
      console.error("Error executing SQL query: " + err.message);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
};

// add code
const addReview = async (req, res) => {
  try {
    const {
      Author,
      description,
      Rating,
      Portfolio_data,
      Service_data,
      Meta_tags,
      Meta_keyword,
      Meta_desc,
      canonical_url,
      Created_date,
      Created_by,
    } = req.body;
    console.log(req.body);

    const sql =
      "INSERT INTO reviews_ (Author, description, Rating, Portfolio_data, Service_data, Meta_tags, Meta_keyword, Meta_desc, canonical_url, Created_date,Created_by ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      Author,
      description,
      Rating,
      Portfolio_data,
      Service_data,
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

// update code
const updateReview = async (req, res) => {
  try {
    const {
      id,
      Author,
      description,
      Rating,
      Portfolio_data,
      Service_data,
      Meta_tags,
      Meta_keyword,
      Meta_desc,
      canonical_url,
      Updated_date,
      Updated_by,
    } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Review ID is required" });
    }

    console.log(req.body);

    const sql = `UPDATE reviews_ SET Author = ?, description = ?, Rating = ?, Portfolio_data = ?, Service_data = ?, Meta_tags = ?, Meta_keyword = ?, Meta_desc = ?, canonical_url = ?, Updated_date = ?, Updated_by = ? WHERE Id = ?`;
    // const values = [Author, description, Rating, JSON.stringify(Portfolio_data), JSON.stringify(Service_data), id];
    const values = [
      Author,
      description,
      Rating,
      Portfolio_data,
      Service_data,
      Meta_tags,
      Meta_keyword,
      Meta_desc,
      canonical_url,
      Updated_date,
      Updated_by,
      id,
    ];

    await connectDB.query(sql, values);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error Updating Data", error);
    res.status(500).send("Internal Server Error");
  }
};

// delete code
const deleteReview = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const query = "DELETE FROM reviews_ WHERE id = ?";
  console.log(query);

  connectDB.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: "Error deleting item from the database" });
    } else {
      res.json({ message: "Item deleted successfully" });
    }
  });
};

module.exports = {
  getReview,
  getPerReview,
  getPortfolio,
  getServies,
  addReview,
  updateReview,
  deleteReview,
};
