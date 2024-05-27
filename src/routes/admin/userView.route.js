const express = require('express');
const router = express.Router();
const userAdminController = require('../../controllers/admin/userView.controller');


router.get('/', userAdminController.getUserPage);
router.post('/create', userAdminController.createUser);
router.post('/update/:id', userAdminController.updateUser);
router.delete('/delete/:id', userAdminController.deleteUser);

router.get('/search', userAdminController.getUserById);
router.post('/search', userAdminController.getUserByKey);

module.exports = router;