const CustomError = require('../errors/CustomError');

module.exports = {
    checkUserOnCreate: (req, res, next) => {
        try {
            const {email = '', name = '', password = ''} = req.body;

            if (!email || !password || !name) {
                throw new CustomError('Some filed is missing', 400);
            }

            if (password.length < 5) {
                throw new CustomError('Password should include at least 5 symbols', 400);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}