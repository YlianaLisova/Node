const router = require('express').Router();

const {userController} = require("../controllers");
const userMiddleware = require("../middlewares/user.middleware")

router.get('/', userController.findUsers);
router.post('/',userMiddleware.checkUserOnCreate, userController.createUser);

router.get('/:userId', userController.getUserById);
router.put('/:userId', userController.updateUserById);
router.delete('/:userId', userController.deleteUserById);

module.exports = router;

