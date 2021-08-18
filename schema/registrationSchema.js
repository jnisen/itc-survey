const Ajv = require("ajv")
const ajv = new Ajv()

export const schemaRegister = {
  type: "object",
  properties: {
    username: {type: "string"},
    email: {type: "string"}, //formate email ver
    password:{type: "string"},
  },
  required: ["username", "email", "password"],
  additionalProperties: false
}

