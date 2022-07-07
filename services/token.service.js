const jwt = require('jsonwebtoken');

const CustomError = require("../errors/CustomError");
const {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, FORGOT_PASS_ACTION_SECRET} = require("../constants/configs");
const {tokenTypeEnum} = require("../enums");
const {FORGOT_PASSWORD} = require("../constants/email-action.enum");

module.exports = {
    generateAuthTokens: (payload = {}) => {
        const access_token = jwt.sign(payload, ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
        const refresh_token = jwt.sign(payload, REFRESH_TOKEN_SECRET, {expiresIn: '30d'});
        return {
            access_token,
            refresh_token
        }
    },

    generateActionToken: (actionType, payload = {}) => {
        let secretWord = '';
        let expiresIn = '7d';

        switch (actionType) {
            case FORGOT_PASSWORD:
                secretWord = FORGOT_PASS_ACTION_SECRET;
                break;

            default:
                throw new CustomError('Wrong action type', 500);
        }

        return jwt.sign(payload, secretWord, {expiresIn});

    },
    checkToken: (token = '', tokenType = tokenTypeEnum.ACCESS) => {
        try {
            let secret;

            if (tokenType === tokenTypeEnum.REFRESH) secret = REFRESH_TOKEN_SECRET;
            if (tokenType === tokenTypeEnum.ACCESS) secret = ACCESS_TOKEN_SECRET;

            return jwt.verify(token, secret);
        } catch (e) {
            throw new CustomError('Token not valid', 401);
        }
    },

    checkActionToken: (token = '',actionType) => {
            let secretWord = '';

            switch (actionType) {
                case FORGOT_PASSWORD:
                    secretWord = FORGOT_PASS_ACTION_SECRET;
                    break;

                default:
                    throw new CustomError('Wrong action type', 500);
            }

            return jwt.verify(token, secretWord);
    },

}
