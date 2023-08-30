const { ObjectId } = require('mongodb');
const Exercise = require('../models/exerciseModel');
const mongoose = require('mongoose');


// GET all
const getAllExercises = async (req, res) => {
    const user_id = req.user._id
    const exercise = await Exercise.find({user_id}).sort({createdAt: -1})
    res.status(200).json(exercise)
};

// GET single
const getSingleExercise = async (req, res) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({error: 'no such exercise'})
    }

    const exercise = await Exercise.findById(id)

    if (!exercise) {
        return res.status(404).json({error: 'no such exercise'})
    }

    res.status(200).json(exercise)
};

// POST new
const postNewExercise = async (req, res) => {
    const {title, mass, reps, target} = req.body

    try {
        const user_id = req.user._id
        const exercise = await Exercise.create({title, mass, reps, target, user_id})
        res.status(200).json({exercise})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

// DELETE one
const deleteExercise = async (req, res) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({error: 'no such exercise'})
    }

    const exercise = await Exercise.findOneAndDelete({_id: new ObjectId(id)})

    if (!exercise) {
        return res.status(404).json({error: 'no such exercise'})
    }

    res.status(200).json(exercise)
};

// UPDATE one
const updateExercise = async (req, res) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({error: 'no such exercise'})
    }

    const exercise = await Exercise.findOneAndUpdate({_id: new ObjectId(id)}, {
        ...req.body
    })

    if (!exercise) {
        return res.status(404).json({error: 'no such exercise'})
    }

    res.status(200).json(exercise)
};

module.exports = {
    postNewExercise,
    getAllExercises,
    getSingleExercise,
    deleteExercise,
    updateExercise
}