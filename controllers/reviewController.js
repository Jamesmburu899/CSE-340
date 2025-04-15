const reviewModel = require("../models/review-model")
const utilities = require("../utilities")
const reviewValidate = require("../utilities/review-validation")

const reviewController = {}

/* ***************************
* Process New Review
* ************************** */
reviewController.addReview = async function (req, res) {
  const { review_text, review_rating, inv_id } = req.body
  const account_id = res.locals.accountData.account_id

  try {
    // Check if user has already reviewed this vehicle
    const existingReview = await reviewModel.checkExistingReview(inv_id, account_id)
    if (existingReview) {
      req.flash("notice", "You have already reviewed this vehicle.")
      return res.redirect(`/inv/detail/${inv_id}`)
    }

    // Add the review
    await reviewModel.addReview(review_text, review_rating, inv_id, account_id)
    req.flash("success", "Review added successfully!")
    return res.redirect(`/inv/detail/${inv_id}`)
  } catch (error) {
    console.error("Error in addReview:", error)
    req.flash("notice", "Error adding review. Please try again.")
    return res.redirect(`/inv/detail/${inv_id}`)
  }
}

/* ***************************
* Process Review Deletion
* ************************** */
reviewController.deleteReview = async function (req, res) {
  const { review_id } = req.params
  const account_id = res.locals.accountData.account_id

  try {
    const deletedReview = await reviewModel.deleteReview(review_id, account_id)
    if (!deletedReview) {
      req.flash("notice", "Unable to delete review.")
      return res.redirect("/account/")
    }
    req.flash("success", "Review deleted successfully!")
    return res.redirect("/account/")
  } catch (error) {
    console.error("Error in deleteReview:", error)
    req.flash("notice", "Error deleting review.")
    return res.redirect("/account/")
  }
}

/* ***************************
* Build Reviews View for Account
* ************************** */
reviewController.buildAccountReviews = async function (req, res, next) {
  try {
    const account_id = res.locals.accountData.account_id
    const reviews = await reviewModel.getReviewsByAccount(account_id)
    
    let reviewsGrid = '<div class="reviews-grid">'
    reviews.forEach(review => {
      reviewsGrid += `
        <div class="review-card">
          <h3>${review.inv_year} ${review.inv_make} ${review.inv_model}</h3>
          <div class="review-rating">${'★'.repeat(review.review_rating)}${'☆'.repeat(5-review.review_rating)}</div>
          <p class="review-text">${review.review_text}</p>
          <div class="review-date">${new Date(review.review_date).toLocaleDateString()}</div>
          <form action="/review/delete/${review.review_id}" method="POST">
            <button type="submit" class="delete-review">Delete Review</button>
          </form>
        </div>
      `
    })
    reviewsGrid += '</div>'
    res.locals.reviewsGrid = reviewsGrid
    next()
  } catch (error) {
    console.error("Error in buildAccountReviews:", error)
    req.flash("notice", "Error loading reviews.")
    res.locals.reviewsGrid = '<p class="notice">Unable to load reviews.</p>'
    next()
  }
}

module.exports = reviewController