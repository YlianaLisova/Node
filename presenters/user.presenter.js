module.exports = {
    userPresenter: (user) => {
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            age: user.age,
            avatar: user.avatar,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }
    }
}
