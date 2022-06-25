const Joi = require("joi");
const {EMAIL_REGEX, PASSWORD_REGEX} = require("../constants/constant");


module.exports = {
    nameValidator: Joi.string().alphanum().min(2).max(100),
    ageValidator: Joi.number().integer().max(130),
    emailValidator: Joi.string().regex(EMAIL_REGEX).lowercase().trim(),
    passwordValidator: Joi.string().regex(PASSWORD_REGEX).required()
}