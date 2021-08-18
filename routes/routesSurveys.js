"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
var controllersSurvey_1 = require("../controllers/controllersSurvey");
router.post('/add', controllersSurvey_1.addSurveys)
    .get('/surveys', controllersSurvey_1.getUniqueId)
    .get('/questions', controllersSurvey_1.getUniqueId)
    .get('/getSurvey/:id', controllersSurvey_1.getPreviousSurvey)
    .get('/getAsnwer/:id/:email', controllersSurvey_1.getAnswer)["delete"]('/user/:id/:email', controllersSurvey_1.deleteSurveys);
module.exports = router;
