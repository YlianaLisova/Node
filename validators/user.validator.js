const Joi = require('joi');

const {PASSWORD_REGEX} = require('../constants/constant')
const {emailValidator} = require("./share");

const userSubScheme = {
    name: Joi.string().alphanum().min(2).max(100).required(),
    age: Joi.number().integer().max(130)
}

const testArraySubScheme = Joi.object({
    car: Joi.boolean()
})

module.exports = {
    newUserValidator: Joi.object({
        ...userSubScheme,
        email: emailValidator.required(),
        password: Joi.string().regex(PASSWORD_REGEX).required()
    }),

    updateUserValidator: Joi.object(userSubScheme),

    testValidator: Joi.object({
        isAdult: Joi.boolean(),
        array: Joi.array().items(testArraySubScheme).when('isAdult', {is: true, then: Joi.required()})
    })
}