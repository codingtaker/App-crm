const express = require('express');
const router = express.Router();
const homeController = require('../../../controllers/api/v1/home.controller');


router.get('/', homeController.getHome);


module.exports = router;