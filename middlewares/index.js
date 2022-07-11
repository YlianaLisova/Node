module.exports = {
    commonMiddleware: require('./common.middleware'),
    userMiddleware : require('./user.middleware'),
    fileMiddleware : require('./file.middleware'),
    authMiddleware : require('./auth.middleware')
};
