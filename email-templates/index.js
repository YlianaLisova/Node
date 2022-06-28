const emailActions = require('../constants/email-action.enum');

module.exports = {
    [emailActions.WELCOME]: {
        subject: 'Welcome on board',
        template: 'welcome'
    },

    [emailActions.FORGOT_PASSWORD] : {
        subject: 'Ops looks like you forgot password',
        template: 'forgot-password'
    }
}