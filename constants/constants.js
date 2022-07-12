module.exports = {
    PASSWORD_REGEX: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[#?!@$%^&*-]).{8,}$/,
    EMAIL_REGEX: /^[a-zA-Z\d.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z\d-]+(?:\.[a-zA-Z\d-]+)*$/,

    AUTHORIZATION: 'Authorization',

    IMAGE_MAX_SIZE: 3 * 1024 * 1024, // 3MB
    IMAGE_MIMETYPES: [
        'image/gif',
        'image/jpeg',
        'image/png'
    ],
};

