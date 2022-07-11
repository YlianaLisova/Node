const router = require('express').Router();

const {userController} = require("../controllers");
const userMiddleware = require("../middlewares/user.middleware")
const CommonMiddleware = require("../middlewares/common.middleware");
const {authMiddleware, fileMiddleware} = require("../middlewares");

router.get('/',userMiddleware.isUserQueryValid, userController.findUsers);
router.post('/', fileMiddleware.checkUserAvatar,userMiddleware.isNewUserValid, userMiddleware.isUserUnique, userController.createUser);

router.get('/:id', CommonMiddleware.isIdValid,userMiddleware.isUserPresent, userController.getUserById);
router.put('/:id', CommonMiddleware.isIdValid,authMiddleware.checkAccessToken,userMiddleware.isUserValidForUpdate,userMiddleware.isUserPresent, userController.updateUserById);
router.delete('/:id',authMiddleware.checkAccessToken, CommonMiddleware.isIdValid,userMiddleware.isUserPresent, userController.deleteUserById);

module.exports = router;

