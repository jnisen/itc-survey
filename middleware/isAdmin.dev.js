"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAdmin = isAdmin;

var _controllersUsers = require("../controllers/controllersUsers");

function isAdmin(req, res, next) {
  var _req$body = req.body,
      email = _req$body.email,
      password = _req$body.password;

  var isAdmin = _controllersUsers.readAllUsers.some(function (elem) {
    return elem.email === email && elem.password === password;
  });

  if (!isAdmin) {
    res.status(401).send({
      error: 'No your not an admin'
    });
  }

  next();
}