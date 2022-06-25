const {userService} = require("../services");
const {hashPassword} = require("../services/password.service");


module.exports = {
    findUsers: async (req, res, next) => {
        try {
            const users = await userService.findUsers();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const hashedPassword = await hashPassword(req.body.password);

            const user = await userService.createUser({...req.body, password: hashedPassword});
            res.status(201).json(user);
        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const {user} = req;
            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            const {id} = req.params;
            const updatedUser = await userService.updateOneUser({__id:id},req.dateForUpdate);

            res.status(201).json(updatedUser);
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


