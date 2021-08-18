const express = require("express");
const app = express();
const fs = require("fs");
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 8000

app.use(cookieParser())
app.use(express.json());
app.use(express.static('public'));

const userRoute = require("./routes/routeUser")

app.use('/user', userRoute);

const surveyRoute = require("./routes/routesSurveys")

app.use('/survey',surveyRoute)



app.listen(port, function () { console.log('Listen on 8000'); });

