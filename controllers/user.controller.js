const {userService, passwordService, s3Service} = require("../services");
const {userPresenter} = require("../presenters/user.presenter");
const {uploadFile} = require("../services/s3.service");
const User = require("../dataBase/User");


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

            const {Location} = await uploadFile(req.files.userAvatar, 'user', user._id);
            const userWithPhoto = await User.findByIdAndUpdate(user._id, {avatar: Location}, {new: true})

            const userForResponse = userPresenter(userWithPhoto);

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
            if (req.files?.userAvatar) {
                if (req.user.avatar) {
                    const {Location} = await uploadFile(req.files.userAvatar, 'user', id);
                    req.body.avatar = Location;
                } else {
                    const {Location} = await s3Service.updateFile(req.files.userAvatar, req.user.avatar);
                    req.body.avatar = Location;
                }
            }

            const updatedUser = await userService.updateOneUser({_id: id}, req.body);

            const userForResponse = userPresenter(updatedUser);

            res.status(201).json(userForResponse);
        } catch (e) {
            next(e);
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
            const {id} = req.params;
            await userService.deleteOneUser({_id: id});

            if (req.user.avatar) {
                await s3Service.deleteFile(req.user.avatar);
            }

            res.status(204).json('User was deleted');
        } catch (e) {
            next(e)
        }
    }
};


