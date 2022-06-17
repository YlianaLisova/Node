const {fileService} = require("../services");
const User = require('../dataBase/User')
const CustomError = require('../errors/CustomError');


module.exports = {
    findUsers: async (req, res, next) => {
        try {
            const users = await User.find();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const {name, age} = req.body;

            if (!Number.isInteger(age) || age < 18) {
                return res.status(400).json('Set valid age')
            }

            if (!name || name.length < 3) {
                return res.status(400).json('Set valid name')
            }

            const user = await User.create(req.body);

            res.status(201).json(user);
        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const {userId} = req.params;

            if (userId.length !== 24) {
                throw new CustomError("Mongo ID is not valid", 403);
            }
            const user = await User.findById(userId);

            if (!user) {
                throw new CustomError(`User with id ${userId} not found`, 404);
            }
            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            const {name, age} = req.body;
            const {userId} = req.params;

            if (age && !Number.isInteger(age) || age < 18) {
                return res.status(400).json('Set valid age')
            }

            if (name && name.length < 3) {
                return res.status(400).json('Set valid name')
            }

            const users = await fileService.reader();

            const index = users.findIndex((user) => user.id === +userId)

            if (index === -1) {
                return res.status(400).json(`User with id ${userId} not found`)
            }

            // const newUserArr = [...users, {...users[index], ...req.body}]
            const updatedUser = Object.assign(users[index], req.body)

            users.splice(index, 1);

            await fileService.writer([...users, updatedUser])

            res.status(201).json(updatedUser);
        } catch (e) {
            next(e);
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
            const {userId} = req.params;

            await User.deleteOne({_id: userId});

            res.status(204).json('User was deleted');
        } catch (e) {
            next(e)
        }
    }
}

