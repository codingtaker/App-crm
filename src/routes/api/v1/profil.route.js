const express = require('express');
const router = express.Router();
const profilController = require('../../../controllers/api/v1/profil.controller');


router.get('/', profilController.getProfil);
router.post('/update/:id', profilController.updateProfil);


module.exports = router;