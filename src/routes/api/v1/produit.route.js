const express = require('express');
const router = express.Router();
const produitCtrl = require('../../../controllers/api/v1/produits.controller');


router.post('/produits', produitCtrl.createProduit);
router.get('/produits', produitCtrl.getAllProduits);
router.get('/produits/:id', produitCtrl.getProduitById);
router.put('/produits/:id/update', produitCtrl.updateProduit);
router.delete('/produits/:id/delete', produitCtrl.deleteProduit);

module.exports = router;
