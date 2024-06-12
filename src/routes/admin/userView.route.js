const express = require('express');
const router = express.Router();
const userAdminController = require('../../controllers/admin/userView.controller');
const auth = require("../../middleware/auth");


router.get('/',auth.checkRole(["admin"]), userAdminController.getUserPage);
router.post('/create',auth.checkRole(["admin"]), userAdminController.createUser);
router.post('/update/:id',auth.checkRole(["admin"]), userAdminController.updateUser);
router.delete('/delete/:id',auth.checkRole(["admin"]), userAdminController.deleteUser);

router.get('/search',auth.checkRole(["admin"]), userAdminController.getUserById);
router.post('/search',auth.checkRole(["admin"]), userAdminController.getUserByKey);

module.exports = router;