const router = require('express').Router();

const {userController} = require("../controllers");
const userMiddleware = require("../middlewares/user.middleware")
const CommonMiddleware = require("../middlewares/common.middleware");
const {authMiddleware, fileMiddleware, commonMiddleware} = require("../middlewares");
const {userValidator, userQueryValidator} = require("../validators");

router.get('/',commonMiddleware.isDataValid(userQueryValidator.findAll, 'query'), userController.findUsers);
router.post('/',commonMiddleware.isDataValid(userValidator.newUserValidator), fileMiddleware.checkUserAvatar, userMiddleware.isUserUnique, userController.createUser);

router.get('/:id', CommonMiddleware.isIdValid,userMiddleware.isUserPresent, userController.getUserById);
router.put('/:id', CommonMiddleware.isIdValid,authMiddleware.checkAccessToken,fileMiddleware.checkUserAvatar,commonMiddleware.isDataValid(userValidator.updateUserValidator),userMiddleware.isUserPresent, userController.updateUserById);
router.delete('/:id',authMiddleware.checkAccessToken, CommonMiddleware.isIdValid,userMiddleware.isUserPresent, userController.deleteUserById);

module.exports = router;

