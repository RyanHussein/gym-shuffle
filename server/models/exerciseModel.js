const mongoose = require('mongoose');

const Schema = mongoose.Schema

const exerciseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    mass: {
        type: Number,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    target: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Exercise', exerciseSchema);