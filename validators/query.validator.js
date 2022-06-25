const Joi = require('joi');

const {emailValidator,ageValidator,nameValidator} = require("./share");

module.exports = {
    findAll: Joi.object({
        name: nameValidator,
        age: ageValidator,
        email: emailValidator,
    })
};
