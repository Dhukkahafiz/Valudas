const express = require("express");
const router = express.Router();
const admin = require("../controller/Login");

router.route("/getadmindata").get(admin.getadmindata);


module.exports = router;
