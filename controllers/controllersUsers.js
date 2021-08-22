"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.scoreAdd = exports.getSurveys = exports.getCookie = exports.endUserLogin = exports.loginUser = exports.usersRegister = exports.readAllUsers = void 0;
var fs = require("fs");
var jwt = require('jwt-simple');
var users_1 = require("../models/users");
var secret_1 = require("./secrets/secret");
exports.readAllUsers = function () {
    var allUsers = fs.readFileSync("./models/data/user.json");
    return JSON.parse(allUsers);
};
function usersRegister(req, res) {
    try {
        var allUsers = exports.readAllUsers();
        var isFound = allUsers.some(function (elem) { return (elem.email === req.body.email) || elem.username === req.body.username; });
        if (!isFound) {
            var user = new users_1.User(req.body.username, req.body.email, req.body.password, [], []);
            allUsers.push(user);
            fs.writeFileSync("./models/data/user.json", JSON.stringify(allUsers));
            res.send({ ok: "Hi " + req.body.username + ", now you can create surveys after login", allUsers: allUsers });
        }
        else {
            var hasUsername = allUsers.some(function (elem) { return (elem.username === req.body.username); });
            if (!hasUsername) {
                var foundUser = allUsers.find(function (elem) { return (elem.email === req.body.email); });
                foundUser.username = req.body.username;
                foundUser.surveys = [];
                fs.writeFileSync("./models/data/user.json", JSON.stringify(allUsers));
                res.send({ ok: "Hi " + req.body.username + ", now you can create surveys after login", allUsers: allUsers });
            }
            else {
                throw new Error("this is user is on database");
            }
        }
    }
    catch (e) {
        res.status(500).send({ error: "" + e });
    }
}
exports.usersRegister = usersRegister;
function loginUser(req, res) {
    try {
        var _a = (req.body), email_1 = _a.email, password_1 = _a.password;
        var allUsers = exports.readAllUsers();
        var isUserExist = allUsers.some(function (elem) { return (elem.email === email_1); });
        var isPasswordOk = allUsers.some(function (elem) { return (elem.password === password_1); });
        if (isUserExist && isPasswordOk) {
            var userLogin = allUsers.find(function (elem) { return (elem.email === email_1) && (elem.password === password_1); });
            if (userLogin.username) {
                var tokenUser = jwt.encode(userLogin, secret_1.secret);
                res.cookie('cookieName', tokenUser, { maxAge: 30000000, httpOnly: true });
                res.send({ ok: "Welcome " + userLogin.username });
            }
            else {
                throw new Error("You're on the database but without username, please go to register");
            }
        }
        else if (isUserExist) {
            throw new Error("Is incorrect your email or password Try Again");
        }
        else {
            throw new Error("Go Register, no user");
        }
    }
    catch (e) {
        res.status(500).send({ error: "" + e.message });
    }
}
exports.loginUser = loginUser;
;
function endUserLogin(req, res) {
    try {
        var _a = (req.body), email_2 = _a.email, password_2 = _a.password;
        var id_1 = req.params.id;
        var allUsers = exports.readAllUsers();
        var allSurveys = JSON.parse(fs.readFileSync("./models/data/survey.json"));
        var isUserOk = allUsers.some(function (elem) { return (elem.email === email_2) && (elem.password === password_2); });
        var isEmailOrPasswordWrong = allUsers.some(function (elem) { return (elem.email === email_2) || (elem.password === password_2); });
        var tokenUser = jwt.encode(email_2, secret_1.secret);
        res.cookie('cookieName', tokenUser, { maxAge: 30000000, httpOnly: true });
        if (isUserOk) {
            var isAdminSurvey = allSurveys.find(function (survey) { return (survey.id === id_1) && (email_2 === survey.admin); });
            if (isAdminSurvey) {
                throw new Error("You cannot vote your own survey");
            }
            else {
                res.send({ ok: "Welcome back " + email_2 + ", thank you for voting" });
            }
        }
        else if (isEmailOrPasswordWrong) {
            throw new Error("Something is wrong, your email or password");
        }
        else {
            var user = new users_1.User(null, req.body.email, req.body.password, null, []);
            allUsers.push(user);
            fs.writeFileSync("./models/data/user.json", JSON.stringify(allUsers));
            res.send({ ok: "Hello " + email_2 + ", thank you for voting", allUsers: allUsers });
        }
    }
    catch (e) {
        res.status(500).send({ error: "" + e.message });
    }
}
exports.endUserLogin = endUserLogin;
function getCookie(req, res) {
    try {
        var cookieName = req.cookies.cookieName;
        if (!cookieName)
            throw new Error("Nothing is on the cookie");
        var decoded = jwt.decode(cookieName, secret_1.secret);
        res.send(decoded);
    }
    catch (e) {
        res.status(500).send({ error: "" + e.message });
    }
}
exports.getCookie = getCookie;
;
function getSurveys(req, res) {
    try {
        var email_3 = req.params.email;
        var allUsers = exports.readAllUsers();
        if (allUsers.length !== 0) {
            var find = allUsers.find(function (user) { return user.email === email_3; });
            res.send(find.surveys);
        }
    }
    catch (e) {
        res.status(500).send({ error: "" + e });
    }
}
exports.getSurveys = getSurveys;
function scoreAdd(req, res) {
    try {
        var id_2 = req.params.id;
        var cookieName = req.cookies.cookieName;
        var decoded_1 = jwt.decode(cookieName, secret_1.secret);
        console.log(decoded_1);
        var allUsers = exports.readAllUsers();
        var allSurveys = JSON.parse(fs.readFileSync("./models/data/survey.json"));
        //admin
        var admin_1 = allSurveys.find(function (survey) { return survey.id === id_2; }).admin;
        var findAdmin = allUsers.find(function (user) { return user.email === admin_1; });
        var findSurveyQuestions = findAdmin.surveys.find(function (survey) { return survey.id === id_2; }).questions;
        var findSurveyinSurveyJSON = allSurveys.find(function (survey) { return survey.id === id_2; }).question;
        for (var i = 0; i < findSurveyQuestions.length; i++) {
            findSurveyQuestions[i].voters.push(__assign(__assign({}, req.body[i]), { 'email': decoded_1 }));
            findSurveyinSurveyJSON[i].voters.push(__assign(__assign({}, req.body[i]), { 'email': decoded_1 }));
        }
        //voter
        var findVoter = allUsers.find(function (voter) { return voter.email === decoded_1; });
        var findSurvey = allSurveys.find(function (survey) { return survey.id === id_2; });
        var responds_1 = [];
        findSurvey.question.forEach(function (survey, index) {
            responds_1.push(__assign({ 'title': survey.title }, req.body[index]));
        });
        var newResponse = {
            'id': id_2,
            'title': findSurvey.title,
            'admin': findSurvey.admin,
            'questions': responds_1
        };
        findVoter.answersSurveys.push(newResponse);
        fs.writeFileSync("./models/data/user.json", JSON.stringify(allUsers));
        fs.writeFileSync("./models/data/survey.json", JSON.stringify(allSurveys));
        res.send({ ok: "Answer Sended" });
    }
    catch (e) {
        res.status(500).send({ error: "" + e });
    }
}
exports.scoreAdd = scoreAdd;
