const User = require('../dataBase/User')

module.exports = {
    findUsers: (params = {}) => {
        return User.find(params)
    },

    createUser: (user) => {
        return User.create(user);
    },

    findOneUser: (params = {}) => {
        return User.findOne(params);
    },
    updateOneUser: (params, userData, options = {new: true}) => {
        return User.findOneAndUpdate(params, userData, options);
    },
    deleteOneUser: (params) => {
        return User.deleteOne(params);
    }

}

