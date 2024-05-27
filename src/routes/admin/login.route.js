const express = require('express');
const router = require("express").Router();
const userCtrl = require('../../controllers/admin/login.controller');

router.get("/", userCtrl.getLogin);
router.post('/', userCtrl.postLogin);
router.get('/signup', userCtrl.getSignup);
router.post('/signup', userCtrl.postSignup)
  

module.exports = router;