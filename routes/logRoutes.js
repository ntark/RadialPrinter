const express = require('express');
const logController = require('../controllers/logController');

const router = express.Router();

router.use(logController.logger);

module.exports = router;