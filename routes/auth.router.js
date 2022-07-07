const router = require('express').Router();

const {authController} = require("../controllers");
const {authMiddleware} = require("../middlewares");
const {FORGOT_PASSWORD} = require("../constants/email-action.enum");

router.post('/login', authMiddleware.isLoginBodyValid, authMiddleware.checkIsUserPresent, authController.login);
router.post('/password/forgot', authMiddleware.checkIsUserPresent, authController.forgotPassword);
router.post('/password/forgot/set',authMiddleware.isNewPasswordValid, authMiddleware.checkActionToken(FORGOT_PASSWORD), authController.setForgotPassword);
router.post('/refreshToken', authMiddleware.checkRefreshToken, authController.refreshToken);
router.post('/logout', authMiddleware.checkAccessToken, authController.logout);
router.post('/logoutAllDevices', authMiddleware.checkAccessToken, authController.logoutAllDevices);

module.exports = router;
