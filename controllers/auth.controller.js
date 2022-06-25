const {tokenService, passwordService} = require("../services");
const {userPresenter} = require("../presenters/user.presenter");
const OAuth = require('../dataBase/OAuth')

module.exports = {
    login: async (req, res, next) => {
        try{
            const {password: hashPassword, _id} = req.user;
            const {password} = req.body;

            await passwordService.comparePassword(hashPassword, password)


            const tokens = tokenService.generateAuthTokens();

            await OAuth.create({
                userId: _id,
                ...tokens
            })

            const user = userPresenter(req.user)
            res.json({
                user,
                ...tokens
            });
        }catch (e) {
            next(e);
        }
    }
};
