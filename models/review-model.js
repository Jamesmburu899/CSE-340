const pool = require("../database/")
const reviewModel = {}

/* *****************************
* Add a new review
* ***************************** */
reviewModel.addReview = async function (review_text, review_rating, inv_id, account_id) {
  try {
    const sql = "INSERT INTO review (review_text, review_rating, inv_id, account_id) VALUES ($1, $2, $3, $4) RETURNING *"
    const result = await pool.query(sql, [review_text, review_rating, inv_id, account_id])
    return result.rows[0]
  } catch (error) {
    console.error("Error in addReview:", error)
    throw new Error("Failed to add review")
  }
}

/* *****************************
* Get reviews by vehicle ID
* ***************************** */
reviewModel.getReviewsByVehicle = async function (inv_id) {
  try {
    const sql = `
      SELECT r.*, a.account_firstname, a.account_lastname 
      FROM review r 
      JOIN account a ON r.account_id = a.account_id 
      WHERE r.inv_id = $1 
      ORDER BY r.review_date DESC
    `
    const result = await pool.query(sql, [inv_id])
    return result.rows
  } catch (error) {
    console.error("Error in getReviewsByVehicle:", error)
    throw new Error("Failed to get vehicle reviews")
  }
}

/* *****************************
* Get reviews by account ID
* ***************************** */
reviewModel.getReviewsByAccount = async function (account_id) {
  try {
    const sql = `
      SELECT r.*, i.inv_make, i.inv_model, i.inv_year 
      FROM review r 
      JOIN inventory i ON r.inv_id = i.inv_id 
      WHERE r.account_id = $1 
      ORDER BY r.review_date DESC
    `
    const result = await pool.query(sql, [account_id])
    return result.rows
  } catch (error) {
    console.error("Error in getReviewsByAccount:", error)
    throw new Error("Failed to get account reviews")
  }
}

/* *****************************
* Delete a review
* ***************************** */
reviewModel.deleteReview = async function (review_id, account_id) {
  try {
    const sql = "DELETE FROM review WHERE review_id = $1 AND account_id = $2 RETURNING *"
    const result = await pool.query(sql, [review_id, account_id])
    return result.rows[0]
  } catch (error) {
    console.error("Error in deleteReview:", error)
    throw new Error("Failed to delete review")
  }
}

/* *****************************
* Check if user has already reviewed
* ***************************** */
reviewModel.checkExistingReview = async function (inv_id, account_id) {
  try {
    const sql = "SELECT * FROM review WHERE inv_id = $1 AND account_id = $2"
    const result = await pool.query(sql, [inv_id, account_id])
    return result.rows[0]
  } catch (error) {
    console.error("Error in checkExistingReview:", error)
    throw new Error("Failed to check existing review")
  }
}

module.exports = reviewModel