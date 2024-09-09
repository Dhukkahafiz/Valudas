const express = require("express");
const router = express.Router();
const technology = require("../controller/technologies");
const Middleware = require("../middleware/FileHandler");

router.route("/getstack").get(technology.getTechStack);
router
  .route("/poststack")
  .post(
    Middleware.uploads.fields([{ name: "Icon", maxCount: 1 }]),
    technology.postTechStack
  );

router.get("/getPerTechnologies/:id", technology.getPerTechnologies);



router
  .route("/updatestack/:id")
  .put(
    Middleware.uploads.fields([{ name: "Icon", maxCount: 1 }]),
    technology.updateTechStack
  );
router.route("/deleteTechnology/:id").delete(technology.deleteTechnology);

module.exports = router;
