const CustomError = require('../errors/CustomError');
const {userService} = require("../services");
const {userValidator, userQueryValidator} = require("../validators");


module.exports = {
    isUserPresent: async (req, res, next) => {
        try {
            const {id} = req.params;

            const user = await userService.findOneUser({_id: id});
            if (!user) {
                return next(new CustomError('User not found', 400))
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },
    isUserUnique: async (req, res, next) => {
        try {
            const {email} = req.body;

            const user = await userService.findOneUser({email: email});//{email}
            if (user) {
                return next(new CustomError(`User with email: ${email} is exist`, 409))
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },
    checkIsUserPresent: async (req, res, next) => {
        try {
            const {email} = req.body;

            const user = await userService.findOneUser({email: email});//{email}
            if (!user) {
                return next(new CustomError('User not found', 404))
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserValidForUpdate: async (req, res, next) => {
        try{
            const {error,value}  = userValidator.updateUserValidator.validate(req.body);

            if (error) {
                return next(new CustomError(error.details[0].message));
            }

            req.body = value;

            next();
        }catch (e) {
            next(e);
        }
    },

    isNewUserValid: async (req, res, next) => {
        try{
            const {error,value}  = userValidator.newUserValidator.validate(req.body);

            if (error) {
                return next(new CustomError(error.details[0].message));
            }

            req.body = value;
            next();
        }catch (e) {
            next(e);
        }
    },

    isUserQueryValid: async (req, res, next) => {
        try{
            const {error,value}  = userQueryValidator.findAll.validate(req.query);

            if (error) {
                return next(new CustomError(error.details[0].message));
            }

            req.query = value;
            next();
        }catch (e) {
            next(e);
        }
    }
}