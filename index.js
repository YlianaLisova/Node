const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/dec-2021');

const {userRouter} = require("./routes");

const app = express();
app.use(express.json());

app.use('/users', userRouter);

app.use('*', (req, res) => {
    res.status(404).json('Page not found')
});

app.use((err, req, res, next) => {
res
    .status(err.status || 500)
    .json({
        error: err.message || 'Unknown error',
        code: err.status || 500
    })
    }
)

app.listen(5000, () => {
    console.log('Started on port 5000')
});

