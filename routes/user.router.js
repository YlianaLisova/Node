const router = require('express').Router();

const {userController} = require("../controllers");
const userMiddleware = require("../middlewares/user.middleware")
const CommonMiddleware = require("../middlewares/common.middleware");

router.get('/',userMiddleware.isUserQueryValid, userController.findUsers);
router.post('/',userMiddleware.isNewUserValid,userMiddleware.isUserUnique, userController.createUser);

router.get('/:id', CommonMiddleware.isIdValid,userMiddleware.isUserPresent, userController.getUserById);
router.put('/:id', CommonMiddleware.isIdValid,userMiddleware.isUserValidForUpdate,userMiddleware.isUserPresent, userController.updateUserById);
router.delete('/:id', CommonMiddleware.isIdValid,userMiddleware.isUserPresent, userController.deleteUserById);

module.exports = router;

