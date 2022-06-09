const express = require('express');
const {fileService} = require("./services");

const app = express();
app.use(express.json())

app.get('/users', async (req, res) => {
    const users = await fileService.reader();
    res.json(users);
})
app.post('/users', async (req, res) => {
    const {name, age} = req.body;

    if (!Number.isInteger(age) || age < 18){
        return res.status(400).json('Set valid age')
    }

    if (!name || name.length < 3){
        return res.status(400).json('Set valid name')
    }

    const users = await fileService.reader();

    const newUser = {...req.body, id: users.length ? users[users.length - 1].id + 1 : 1}
    await fileService.writer([...users, newUser])

    res.json(newUser);
})


app.listen(5000, () => {
    console.log('Started on port 5000')
})