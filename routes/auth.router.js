const router = require('express').Router();

const {authController} = require("../controllers");
const {authMiddleware} = require("../middlewares");

router.post('/login', authMiddleware.isLoginBodyValid, authMiddleware.checkIsUserPresent, authController.login);
router.post('/refreshToken', authMiddleware.checkRefreshToken, authController.refreshToken);
router.post('/logout', authMiddleware.checkAccessToken, authController.logout);
router.post('/logoutAllDevices', authMiddleware.checkAccessToken, authController.logoutAllDevices);
router.post('/forgotPassword',authMiddleware.isEmailValid, authMiddleware.checkIsUserPresentByEmail, authController.forgotPassword);

module.exports = router;
