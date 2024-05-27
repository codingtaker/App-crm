const express = require('express');
const router = express.Router();
const produitsAdminController = require('../../controllers/admin/produitView.controller');


router.get('/', produitsAdminController.getProduitsPage);
router.post('/create', produitsAdminController.createProduit);
router.post('/update/:id', produitsAdminController.updateProduit);
router.delete('/delete/:id', produitsAdminController.deleteProduit);

router.get('/search', produitsAdminController.getElementById);
router.post('/search', produitsAdminController.getElementByKey);

module.exports = router;