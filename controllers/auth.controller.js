const {tokenService, passwordService, emailService} = require("../services");
const {userPresenter} = require("../presenters/user.presenter");
const OAuth = require('../dataBase/OAuth');
const {WELCOME} = require('../constants/email-action.enum');

module.exports = {
    login: async (req, res, next) => {
        try{
            const {password: hashPassword, _id, name} = req.user;
            const {password, email} = req.body;

            await emailService.sendMail('y.lisova16@gmail.com', WELCOME, {userName: name});// TEST EMAIL
            // await emailService.sendMail(email, WELCOME); // REAL EMAIL

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
    },
    refreshToken: async (req, res, next) => {
        try{
            const {userId, refresh_token} = req.tokenInfo;

            await OAuth.deleteOne({refresh_token});

            const tokens = tokenService.generateAuthTokens();

            await OAuth.create({userId, ...tokens})

            res.json(tokens);
        }catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try{
            const {access_token} = req;

            await OAuth.deleteOne({access_token});

            res.sendStatus(204);
        }catch (e) {
            next(e);
        }
    },
    logoutAllDevices: async (req, res, next) => {
        try{
            const {_id} = req.user;

            await OAuth.deleteMany({userId: _id});

            res.sendStatus(204);
        }catch (e) {
            next(e);
        }
    },
};
