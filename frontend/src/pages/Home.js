import { useEffect, useState } from "react";
import axios from 'axios';
import ExerciseDetails from "../components/ExerciseDetails";
import ExerciseForm from "../components/ExerciseForm";
import Shuffle from "../components/Shuffle";
import ShuffledExerciseDetails from "../components/ShuffledExerciseDetails";

const Home = () => {
    const [exercises, setExercises] = useState(null);
    const [shuffledExercises, setShuffledExercises] = useState(null);

    const user = localStorage.getItem('user')
    const userData = JSON.parse(user)

    useEffect(() => {
        fetchExercises()
    }, []);

    const fetchExercises = async () => {
        if (!userData) {return}

        try {
            const response = await axios.get('http://localhost:4000/api/exercises', {
                headers: {
                    'authorisation': `Bearer ${userData.token}`
                }
            })
            setExercises(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleAddExercise = async () => {
        fetchExercises()
    };

    const handleDeleteExercise = (exerciseId) => {
        setExercises(prevExercises => prevExercises.filter(exercise => exercise._id !== exerciseId));
    };

    const handleShuffleExercises = async (amount, targetFilters) => {
        if (!userData) {return}
        
        const filtersArray = targetFilters.split('-');
    
        const filteredExercises = exercises.filter(exercise =>
            filtersArray.some(filter => exercise.target.includes(filter))
        );

        const shuffled = filteredExercises.sort(() => 0.5 - Math.random()).slice(0, amount);

        setShuffledExercises(shuffled);
    };


    return (  
        <div className="home">
            <div className="exercises">
                {exercises && exercises.map((exercise) => (
                    <ExerciseDetails exercise={exercise} onDelete={handleDeleteExercise} key={exercise._id}/>
                ))}
            </div>
            <div className="form">
                <ExerciseForm onAdd={handleAddExercise}/>
            </div>
            <div>
                <Shuffle onShuffle={handleShuffleExercises}/>
                {shuffledExercises && shuffledExercises.map((exercise) => (
                    <ShuffledExerciseDetails exercise={exercise} key={exercise._id}/>
                ))}
            </div>
        </div>
    );
}
 
export default Home;