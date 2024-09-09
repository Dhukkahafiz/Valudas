const express = require("express");
const router = express.Router();
const service = require("../controller/Service");
const Middleware = require("../middleware/FileHandler");

router.route("/getservice").get(service.getService);
router.route("/getperent").get(service.getServicewithperent);

router.route("/getservice/:id").get(service.getServicewithid);
router.route("/getServicewithServiceID").get(service.getServicewithServiceID); 
router.route("/getServicewithPortfolioID").get(service.getServicewithPortfolioID);

router
  .route("/addService")
  .post(
    Middleware.uploads.fields([
      { name: "Service_icon" },
      { name: "Service_page_image" },
    ]),
    service.addservice
  );
router
  .route("/editService/:id")
  .put(
    Middleware.uploads.fields([
      { name: "Service_icon" },
      { name: "Service_page_image" },
    ]),
    service.updateService
  );

router.route("/deleteservice/:id").delete(service.deleteServiceData);

module.exports = router;
