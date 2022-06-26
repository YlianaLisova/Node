const jwt = require('jsonwebtoken');
const CustomError = require("../errors/CustomError");
const {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} = require("../constants/configs");
const {tokenTypeEnum} = require("../enums");

module.exports = {
    generateAuthTokens: (payload = {}) => {
        const access_token = jwt.sign(payload, ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
        const refresh_token = jwt.sign(payload, REFRESH_TOKEN_SECRET, {expiresIn: '30d'});
        return {
            access_token,
            refresh_token
        }
    },
    checkToken: (token = '', tokenType = tokenTypeEnum.ACCESS) => {
        try {
            let secret;

            if (tokenType === tokenTypeEnum.REFRESH) secret = REFRESH_TOKEN_SECRET;
            if (tokenType === tokenTypeEnum.ACCESS)  secret = ACCESS_TOKEN_SECRET;

            return jwt.verify(token, secret);
        } catch (e) {
            throw new CustomError('Token not valid', 401);
        }
    },

}