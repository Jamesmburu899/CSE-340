const express = require('express');
const router = express.Router();
const invController = require('../controllers/inventoryController');

// Vehicle detail route
router.get('/detail/:inv_id', invController.buildByInvId);

// Error trigger route
router.get('/trigger-error', invController.triggerError);

module.exports = router;