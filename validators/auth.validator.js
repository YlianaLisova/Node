const Joi = require('joi');
const {emailValidator, passwordValidator} = require("./share");

module.exports = {
    login: Joi.object({
        email: emailValidator.required(),
        password: passwordValidator.required(),
    }),
    newPassword: Joi.object({
        password: passwordValidator.required(),
    })
};
