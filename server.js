var express = require("express");
var app = express();
var fs = require("fs");
var cookieParser = require('cookie-parser');
var port = process.env.PORT || 8000;
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));
var userRoute = require("./routes/routeUser");
app.use('/user', userRoute);
var surveyRoute = require("./routes/routesSurveys");
app.use('/survey', surveyRoute);
app.listen(port, function () { console.log('Listen on 8000'); });
