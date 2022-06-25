const jwt = require('jsonwebtoken');
const CustomError = require("../errors/CustomError");
const {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} = require("../constants/config");

module.exports = {
    generateAuthTokens: (payload = {}) => {
        const access_token = jwt.sign(payload, ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
        const refresh_token = jwt.sign(payload, REFRESH_TOKEN_SECRET, {expiresIn: '30d'});
        return {
            access_token,
            refresh_token
        }
    },
    checkAccessToken: (token = '') => {
        try {
            return jwt.verify(token, 'asd');
        } catch (e) {
            throw new CustomError('Token not valid', 401);
        }
    }

}