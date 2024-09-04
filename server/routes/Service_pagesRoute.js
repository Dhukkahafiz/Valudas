const express = require("express");
const router = express.Router();
const Service_pages = require("../controller/Service_pages");
const Middleware = require("../middleware/FileHandler");

router.route("/getservicepage").get(Service_pages.getServices_pages);
router.route("/getservicepageWithID/:id").get(Service_pages.getServicewithid);
router
  .route("/addServicepage")
  .post(
    Middleware.uploads.single("Icon"),
    Service_pages.addService_pages
  );
  router
  .route("/EditServicepage/:id")
  .put(
    Middleware.uploads.single("Icon"),
    Service_pages.editservice
  );
// router.route("/updateindustrydata/:id").put(industriesData.updateIndustry);
router.route("/DeleteServicedata/:id").delete(Service_pages.deleteServiceData);

module.exports = router;
