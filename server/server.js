require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const exerciseRoutes = require('./routes/exercises');
const userRoutes = require('./routes/user');

const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
});

// routes
app.use('/api/exercises', exerciseRoutes);
app.use('/api/user', userRoutes);

// db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(4000, () => {
            console.log('Connected!')
        });
    })
    .catch((error) => {
        console.log(error);
    });