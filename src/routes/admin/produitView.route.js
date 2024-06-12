const express = require('express');
const router = express.Router();
const produitsAdminController = require('../../controllers/admin/produitView.controller');
const auth = require("../../middleware/auth");


router.get('/',auth.checkRole(["admin"]),produitsAdminController.getProduitsPage);
router.post('/create',auth.checkRole(["admin"]),produitsAdminController.createProduit);
router.post('/update/:id',auth.checkRole(["admin"]),produitsAdminController.updateProduit);
router.delete('/delete/:id',auth.checkRole(["admin"]),produitsAdminController.deleteProduit);

router.get('/search',auth.checkRole(["admin"]),produitsAdminController.getElementById);
router.post('/search',auth.checkRole(["admin"]),produitsAdminController.getElementByKey);

module.exports = router;