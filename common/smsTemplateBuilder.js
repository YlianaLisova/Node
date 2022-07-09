const {smsActionTypeEnum} = require("../enums");
module.exports = {
    [smsActionTypeEnum.WELCOME]: (name) => {
        return `Hi, ${name}! Welcome on out platform`;
    }
};

