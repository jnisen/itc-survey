"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schemaRegister = void 0;

var Ajv = require("ajv");

var ajv = new Ajv();
var schemaRegister = {
  type: "object",
  properties: {
    username: {
      type: "string"
    },
    email: {
      type: "string"
    },
    //formate email ver
    password: {
      type: "string"
    }
  },
  required: ["username", "email", "password"],
  additionalProperties: false
};
exports.schemaRegister = schemaRegister;