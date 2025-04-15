const express = require("express")
const router = new express.Router()
const reviewController = require("../controllers/reviewController")
const reviewValidate = require("../utilities/review-validation")
const utilities = require("../utilities")
const { checkLogin } = require("../utilities/checkAccountType")

// Process the review submission
router.post(
  "/review/add",
  checkLogin,
  reviewValidate.reviewRules(),
  reviewValidate.checkReviewData,
  reviewController.addReview
)

// Process review deletion
router.post(
  "/review/delete/:review_id",
  checkLogin,
  reviewController.deleteReview
)

module.exports = router