const utilities = require(".")
const { body, validationResult } = require("express-validator")

const validateReview = {
  /* ******************************
  * Review Data Validation Rules
  * ***************************** */
  reviewRules: () => {
    return [
      body("review_text")
        .trim()
        .isLength({ min: 10 })
        .withMessage("Review must be at least 10 characters long.")
        .isLength({ max: 1000 })
        .withMessage("Review cannot exceed 1000 characters.")
        .escape(),

      body("review_rating")
        .isInt({ min: 1, max: 5 })
        .withMessage("Rating must be between 1 and 5 stars.")
    ]
  },

  /* ******************************
  * Check Review Data and return errors or continue
  * ***************************** */
  checkReviewData: async (req, res, next) => {
    const { review_text, review_rating } = req.body
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      res.render("inventory/detail", {
        errors,
        title: "Vehicle Detail",
        nav,
        review_text,
        review_rating,
      })
      return
    }
    next()
  },

  /* ******************************
  * Build review HTML for vehicle detail view
  * ***************************** */
  buildReviewHtml: (reviews) => {
    let reviewHtml = '<div class="vehicle-reviews">'
    if (!reviews || reviews.length === 0) {
      reviewHtml += '<p class="notice">No reviews yet. Be the first to review!</p>'
    } else {
      reviewHtml += '<h3>Customer Reviews</h3>'
      reviews.forEach(review => {
        reviewHtml += `
          <div class="review-item">
            <div class="review-header">
              <span class="reviewer-name">${review.account_firstname} ${review.account_lastname}</span>
              <span class="review-rating">${'★'.repeat(review.review_rating)}${'☆'.repeat(5-review.review_rating)}</span>
              <span class="review-date">${new Date(review.review_date).toLocaleDateString()}</span>
            </div>
            <p class="review-text">${review.review_text}</p>
          </div>
        `
      })
    }
    reviewHtml += '</div>'
    return reviewHtml
  }
}

module.exports = validateReview