const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');

const {NO_REPLY_EMAIL_PASSWORD, NO_REPLY_EMAIL} = require('../constants/configs');
const emailTemplates = require('../email-templates/index');
const CustomError = require("../errors/CustomError");
const path = require('path');

module.exports = {
    sendMail: async (userMail = '', emailAction = '', locals = {}) => {
        const templateParser = new EmailTemplates({
            views: {
                root: path.join(process.cwd(), 'email-templates')
            }
        });


        const templateInfo = emailTemplates[emailAction];

        if (!templateInfo) {
            throw new CustomError('Wrong email action', 500);
        }

        locals.frontendURL = 'google.com';

        const html = await templateParser.render(templateInfo.template, locals);

        const transporter = nodemailer.createTransport({
            auth: {
                user: NO_REPLY_EMAIL,
                pass: NO_REPLY_EMAIL_PASSWORD
            },
            service: 'gmail'
        })

        return transporter.sendMail({
            from: 'No reply',
            to: userMail,
            subject: templateInfo.subject,
            html
        })
    }
}