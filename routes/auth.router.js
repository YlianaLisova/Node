const router = require('express').Router();

const {authController} = require("../controllers");
const {userMiddleware} = require("../middlewares");

router.post('/login',userMiddleware.checkIsUserPresent, authController.login);

module.exports = router;
