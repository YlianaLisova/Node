const express = require('express');
const {userRouter} = require("./routes");

const app = express();
app.use(express.json());

app.use('/users', userRouter);

app.use('*', (req, res)=>{
    res.status(404).json('Page not found')
});

app.listen(5000, () => {
    console.log('Started on port 5000')
});

