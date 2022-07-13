const CustomError = require('../errors/CustomError');
const {userService} = require("../services");


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

}
