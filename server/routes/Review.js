const express = require("express");
const router = express.Router();
const reviewData = require("../controller/Review");

router.route("/getReview").get(reviewData.getReview);
router.get("/getPerReview/:id", reviewData.getPerReview);
router.route("/getportfolio").get(reviewData.getPortfolio);
router.route("/getServies").get(reviewData.getServies);
router.route("/addReview").post(reviewData.addReview);
router.route("/updateReview/:id").put(reviewData.updateReview);
router.route("/deleteReview/:id").delete(reviewData.deleteReview);

module.exports = router;
