const OAuth = require('../dataBase/OAuth');

module.exports = async () => {
    await OAuth.deleteMany({
        createdAt: { $lte: '' }
    })
}
