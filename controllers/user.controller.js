const {userService, passwordService} = require("../services");
const {userPresenter} = require("../presenters/user.presenter");


module.exports = {
    findUsers: async (req, res, next) => {
        try {
            const users = await userService.findUsers(req.query).exec();

            const usersForResponse = users.map(u => userPresenter(u));

            res.json(usersForResponse);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const hashedPassword = await passwordService.hashPassword(req.body.password);

            const user = await userService.createUser({...req.body, password: hashedPassword});

            const userForResponse = userPresenter(user);

            res.status(201).json(userForResponse);
        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const {user} = req;

            const userForResponse = userPresenter(user);

            res.json(userForResponse);
        } catch (e) {
            next(e);
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            const {id} = req.params;
            const updatedUser = await userService.updateOneUser({_id:id},req.body);

            const userForResponse = userPresenter(updatedUser);

            res.status(201).json(userForResponse);
        } catch (e) {
            next(e);
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
            const {id} = req.params;
            await userService.deleteOneUser({_id : id});

            res.status(204).json('User was deleted');
        } catch (e) {
            next(e)
        }
    }
};


