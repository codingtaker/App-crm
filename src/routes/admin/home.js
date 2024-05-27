const express = require('express');
const router = express.Router();
const dashbordAdminController = require('../../controllers/admin/home');


router.get('/', dashbordAdminController.getDashbord);


module.exports = router;