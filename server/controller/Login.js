const connectDB = require("../database/connection");

// get data
const getadmindata = async (req, res) => {
  try {
    const Que = `SELECT * FROM admin`;
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



module.exports = {
    getadmindata,

  };