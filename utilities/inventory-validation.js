const { body, validationResult } = require('express-validator')

const validate = {}

/* ************************
 * Classification Validation Rules
 ************************** */
validate.classificationRules = () => {
  return [
    body('classification_name')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Please provide a classification name.')
      .isAlpha()
      .withMessage('Classification name must contain only letters.')
      .isLength({ max: 30 })
      .withMessage('Classification name must be less than 30 characters.')
  ]
}

/* ************************
 * Inventory Validation Rules
 ************************** */
validate.inventoryRules = () => {
  return [
    body('inv_make')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Please provide a make.'),
    body('inv_model')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Please provide a model.'),
    body('inv_year')
      .isInt({ min: 1900, max: new Date().getFullYear() + 1 })
      .withMessage('Please provide a valid year.'),
    body('inv_description')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Please provide a description.'),
    body('inv_price')
      .isDecimal()
      .withMessage('Please provide a valid price.'),
    body('inv_miles')
      .isInt({ min: 0 })
      .withMessage('Please provide valid mileage.'),
    body('inv_color')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Please provide a color.')
  ]
}

/* ************************
 * Check Validation Results
 ************************** */
validate.checkValidation = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    let messages = errors.array().map(error => ({
      type: 'error',
      text: error.msg
    }))
    req.flash('messages', messages)
    return res.render(`inventory/${req.originalUrl.split('/')[2]}`, {
      messages: req.flash(),
      ...req.body
    })
  }
  next()
}

module.exports = validate