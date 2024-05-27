const express = require('express');
const router = express.Router();
const usersController = require('../../../controllers/api/v1/users.controller');

router.post('/users', usersController.createUser);
router.get('/users', usersController.getAllUsers);
router.get('/users/:id', usersController.getUserById);
router.put('/users/:id/update', usersController.updateUser);
router.delete('/users/:id/delete', usersController.deleteUser);

module.exports = router;