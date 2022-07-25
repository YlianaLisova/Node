require('dotenv').config();

const express = require('express');
const expressFileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const cors = require('cors');

const {userRouter, authRouter} = require("./routes");
const {NODE_ENV, CORS_WHITE_LIST} = require("./constants/configs");
const cronRun = require("./cron");

mongoose.connect("mongodb://localhost:27017/dec-2021");


const app = express();
app.use(express.json());

if (NODE_ENV !== 'prod') {
    const morgan = require('morgan');

    app.use(morgan('dev'));
}

app.use(cors(_configureCors()));
app.use(expressFileUpload());
app.use('/auth', authRouter);
app.use('/users', userRouter);

app.use('*', (req, res) => {
    res.status(404).json('Page not found')
});

app.use((err, req, res, next) => {
        console.log(err);
        res
            .status(err.status || 500)
            .json({
                error: err.message || 'Unknown error',
                code: err.status || 500
            })
    }
)

app.listen(5000, () => {
    console.log('Started on port 5000');
    cronRun();
});


function _configureCors () {
    const whitelist = CORS_WHITE_LIST.split(';');
    return {
        origin: (origin, callback) => {
            if (whitelist.includes(origin)) {
                return callback(null, true)
            }

            callback(new Error('Not allowed by CORS'))
        }
    }
}
