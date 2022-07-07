const CustomError = require("../errors/CustomError");
const {checkToken, checkActionToken} = require("../services/token.service");
const OAuth = require('../dataBase/OAuth');
const ActionToken = require('../dataBase/ActionToken');
const {userService} = require("../services");
const {authValidator} = require("../validators");
const {tokenTypeEnum} = require("../enums");
const {AUTHORIZATION} = require("../constants/constants");

module.exports = {
    checkAccessToken: async (req, res, next) => {
        try{
            const access_token = req.get(AUTHORIZATION);

            if(!access_token) {
                return next(new CustomError('No token', 401));
            }

            checkToken(access_token);

            const tokenInfo = await OAuth.findOne({access_token}).populate('userId');

            if (!tokenInfo) {
                return next(new CustomError('Token not valid', 401));
            }

            req.access_token = tokenInfo.access_token;
            req.user = tokenInfo.userId;
            next();
        }catch (e) {
            next(e);
        }
    },

    checkActionToken: (actionType) => async (req, res, next) => {
        try{
            const action_token = req.get(AUTHORIZATION);

            if(!action_token) {
                return next(new CustomError('No token', 401));
            }
            checkActionToken(action_token, actionType);

            const tokenInfo = await ActionToken.findOne({token: action_token}).populate('userId');

            if (!tokenInfo) {
                return next(new CustomError('Token not valid', 401));
            }

            req.user = tokenInfo.userId;

            next();
        }catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try{
            const refresh_token = req.get(AUTHORIZATION);

            if(!refresh_token) {
                return next(new CustomError('No token', 401));
            }

            checkToken(refresh_token, tokenTypeEnum.REFRESH);

            const tokenInfo = await OAuth.findOne({refresh_token});

            if (!tokenInfo) {
                return next(new CustomError('Token not valid', 401));
            }

            req.tokenInfo = tokenInfo;
            next();
        }catch (e) {
            next(e);
        }
    },

    checkIsUserPresent: async (req, res, next) => {
        try {
            const {email} = req.body;

            const user = await userService.findOneUser({email: email});//{email}
            if (!user) {
                return next(new CustomError('Wrong email or password', 400))
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    isLoginBodyValid: async (req, res, next) => {
        try {
            const {error, value} = await authValidator.login.validate(req.body);

            if (error) {
                return next(new CustomError('Wrong email or password', 400))
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },

    isNewPasswordValid: async (req, res, next) => {
        try {
            const {error, value} = await authValidator.newPassword.validate(req.body);

            if (error) {
                return next(new CustomError('Enter valid password', 400))
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },
}
