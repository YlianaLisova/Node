const {tokenService, passwordService, emailService} = require("../services");
const {userPresenter} = require("../presenters/user.presenter");
const OAuth = require('../dataBase/OAuth');
const User = require('../dataBase/User');
const {WELCOME, FORGOT_PASSWORD} = require('../constants/email-action.enum');
const {generateActionToken} = require("../services/token.service");
const ActionTokens = require("../dataBase/ActionToken");

module.exports = {
    login: async (req, res, next) => {
        try {
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
        } catch (e) {
            next(e);
        }
    },

    forgotPassword: async (req, res, next) => {
        try {
            const {_id, name} = req.user;
            const token = generateActionToken(FORGOT_PASSWORD, {name, _id});

            await ActionTokens.create({
                userId: _id,
                token,
                actionType: FORGOT_PASSWORD
            });

            await emailService.sendMail(
                'lisova229@gmail.com',
                FORGOT_PASSWORD,
                {userName: name, token});// TEST EMAIL
            // await emailService.sendMail(email, WELCOME); // REAL EMAIL

            res.json('Ok');
        } catch (e) {
            next(e);
        }
    },

    setForgotPassword: async (req, res, next) => {
        try {
            const {_id} = req.user;
            const {password} = req.body;

            const hashPassword = await passwordService.hashPassword(password);
            const updatedUser = await User.findByIdAndUpdate(_id, {password: hashPassword}, {new: true});

            await ActionTokens.deleteOne({actionType: FORGOT_PASSWORD, userId: _id});
            res.json(updatedUser)
        } catch (e) {
            next(e);
        }
    },

    refreshToken: async (req, res, next) => {
        try {
            const {userId, refresh_token} = req.tokenInfo;

            await OAuth.deleteOne({refresh_token});

            const tokens = tokenService.generateAuthTokens();

            await OAuth.create({userId, ...tokens})

            res.json(tokens);
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const {access_token} = req;

            await OAuth.deleteOne({access_token});

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },
    logoutAllDevices: async (req, res, next) => {
        try {
            const {_id} = req.user;

            await OAuth.deleteMany({userId: _id});

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },
};
