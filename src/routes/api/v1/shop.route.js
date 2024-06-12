const express = require('express');
const router = express.Router();
const shopController = require('../../../controllers/api/v1/shop.controller');


router.get('/', shopController.getShop);
router.post('/update/:id', shopController.updateShop);
router.delete('/delete/:id', shopController.deleteShop);

router.get('/search', shopController.getElementById);
router.post('/search', shopController.getElementByKey);


module.exports = router;