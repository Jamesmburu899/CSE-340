const invModel = require('../models/inventory-model');
const utilities = require('../utilities');

const invCont = {};

/* ***************************
 * Build inventory by inventory_id view
 * ************************** */
invCont.buildByInvId = async function (req, res, next) {
  try {
    const inv_id = req.params.inv_id;
    const data = await invModel.getInventoryById(inv_id);
    
    if (!data) {
      let nav = await utilities.getNav();
      return res.status(404).render("errors/error", {
        title: "404 - Vehicle Not Found",
        message: "The requested vehicle could not be found.",
        nav
      });
    }
    
    const html = await utilities.buildVehicleDetail(data);
    res.render('inventory/detail', {
      title: `${data.inv_make} ${data.inv_model}`,
      html,
      nav: await utilities.getNav()
    });
  } catch (error) {
    next(error);
  }
};

/* ***************************
 * Trigger intentional error
 * ************************** */
invCont.triggerError = function(req, res, next) {
  try {
    throw new Error('Intentional 500 error triggered from footer');
  } catch (error) {
    next(error);
  }
};

module.exports = invCont;