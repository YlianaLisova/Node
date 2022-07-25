const dayjs = require('dayjs');

const OAuth = require('../dataBase/OAuth');

module.exports = async () => {
    const oneMonthBeforeNow = dayjs().subtract(1, 'month');

    console.log(oneMonthBeforeNow);

    const query = await OAuth.deleteMany({
        createdAt: { $lte: oneMonthBeforeNow }
    });

    console.log(query, 'remove token data');
}
