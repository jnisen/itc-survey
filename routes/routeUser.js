"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
var controllersUsers_1 = require("../controllers/controllersUsers");
router.post('/user', controllersUsers_1.usersRegister)
    .post('/userLogin', controllersUsers_1.loginUser)
    .post('/endUserLogin/:id', controllersUsers_1.endUserLogin)
    .get('/getCookie', controllersUsers_1.getCookie)
    .get('/show/:email', controllersUsers_1.getSurveys)
    .post('/add/:id', controllersUsers_1.scoreAdd);
module.exports = router;
