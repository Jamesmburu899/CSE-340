const { body, validationResult } = require("express-validator")
const utilities = require(".")

const validate = {}

validate.classificationRules = () => {
  return [
    body("classification_name")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a classification name.")
      .isAlpha()
      .withMessage("Classification name must contain only letters.")
      .isLength({ max: 30 })
      .withMessage("Classification name must be less than 30 characters."),
  ]
}

validate.inventoryRules = () => {
  return [
    body("inv_make")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a make."),
    body("inv_model")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a model."),
    body("inv_year")
      .isInt({ min: 1900, max: new Date().getFullYear() + 1 })
      .withMessage("Please provide a valid year."),
    body("inv_description")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a description."),
    body("inv_price")
      .isDecimal()
      .withMessage("Please provide a valid price."),
    body("inv_miles")
      .isInt({ min: 0 })
      .withMessage("Please provide valid mileage."),
    body("inv_color")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a color.")
  ]
}

validate.inventoryUpdateRules = () => {
  return [
    body('inv_id')
      .isInt()
      .withMessage('Invalid vehicle ID'),
    // Add other validation rules same as inventoryRules
  ]
}

/* ************************
 * Check Validation Results
 ************************** */
validate.checkValidation = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    const { classification_name } = req.body
    let messages = errors.array().map(error => ({
      type: 'error',
      text: error.msg
    }))
    req.flash("messages", messages)
    res.status(400).render("inventory/add-classification", {
      errors,
      messages: req.flash(),
      title: "Add Classification",
      nav,
      classification_name
    })
    return
  }
  next()
}

module.exports = validate