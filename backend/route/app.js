'use strict';

const express = require('express');
const router = express.Router();

var userController = require('../app/controller/userController.js');
module.exports = router;
//register
router.post('/user', function (req, res) {
    userController.registerUser(req, res);
});

//login
router.post('/login', function (req, res) {
    userController.login(req, res);
});

//getAll users from db
router.get('/users', function (req, res) {
    userController.getAll(req, res);
});

//delete particular user
router.delete('/deleteUser/:id', function (req, res) {
    userController.delete(req, res);
});

//edit the user details
router.put('/editUser/:id', function (req, res) {
    userController.update(req, res);
});







