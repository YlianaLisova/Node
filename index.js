const express = require('express');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/dec-2021");

const app = express();
app.use(express.json());