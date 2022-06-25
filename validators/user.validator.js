const Joi = require('joi');

const {emailValidator, nameValidator, ageValidator, passwordValidator} = require("./share");


// const testArraySubScheme = Joi.object({
//     car: Joi.boolean()
// })

module.exports = {
    newUserValidator: Joi.object({
        name: nameValidator.required(),
        age: ageValidator.required(),
        email: emailValidator.required(),
        password: passwordValidator.required()
    }),

    updateUserValidator: Joi.object({
        name: nameValidator,
        age: ageValidator
    }),

    // testValidator: Joi.object({
    //     isAdult: Joi.boolean(),
    //     array: Joi.array().items(testArraySubScheme).when('isAdult', {is: true, then: Joi.required()})
    // })
}