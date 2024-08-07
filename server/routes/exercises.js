const express = require('express');
const { 
    postNewExercise,
    getAllExercises,
    getSingleExercise,
    updateExercise,
    deleteExercise
} = require('../controllers/exerciseController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

// GET all
router.get('/', getAllExercises);

// GET single
router.get('/:id', getSingleExercise);

// POST new
router.post('/', postNewExercise);

// DELETE one
router.delete('/:id', deleteExercise);

// UPDATE one
router.patch('/:id', updateExercise);

module.exports = router;