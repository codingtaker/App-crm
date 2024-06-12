const express = require('express');
const router = express.Router();
const dashbordAdminController = require('../../controllers/admin/dashbord');
const auth = require("../../middleware/auth");


router.get('/',auth.checkRole(["admin"]), dashbordAdminController.getDashbord);
router.post('/update/:id',auth.checkRole(["admin"]), dashbordAdminController.updateDashbord);


module.exports = router;