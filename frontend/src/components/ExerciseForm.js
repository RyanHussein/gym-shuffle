import { useState } from "react";
import axios from 'axios';

const ExerciseForm = ({onAdd}) => {
    const [title, setTitle] = useState('');
    const [mass, setMass] = useState('');
    const [reps, setReps] = useState('');
    const [target, setTarget] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault()

        const user = localStorage.getItem('user')
        const userData = JSON.parse(user)

        if (!userData) {
            setError('Login to add an exercise.')
            return
        }

        const exercise = {
            title: title,
            mass: mass,
            reps: reps,
            target: target,
        }

        try {
            const response = await axios.post('http://localhost:4000/api/exercises', exercise, {
                headers: {
                    'authorisation': `Bearer ${userData.token}`
                }
            })
            console.log(response.status);
            onAdd();
            setError(null)
            setTitle('')
            setMass('')
            setReps('')
            setTarget('')  
        } catch (error) {
            setError("Please fill in the all the fields above.")
        }

    }

    return (  
        <form className="exercise-form" onSubmit={handleSubmit}>
            <h3>Add A New Exercise!</h3>

            <label htmlFor="title">Title</label>
            <input type="text" id="title" className={error && !title ? "error" : "input"} value={title} onChange={(e) => setTitle(e.target.value)}/>

            <label htmlFor="mass">Mass (Kg)</label>
            <input type="number" id="mass" className={error && !mass ? "error" : "input"} min="0" value={mass} onChange={(e) => setMass(e.target.value)}/>

            <label htmlFor="reps">Repetitions</label>
            <input type="number" id="reps" className={error && !reps ? "error" : "input"} min="0" value={reps} onChange={(e) => setReps(e.target.value)}/>

            <label htmlFor="target">Target Muscle</label>
            <input type="text" id="target" className={error && !target ? "error" : "input"} value={target} onChange={(e) => setTarget(e.target.value)}/>

            <button>Add Exercise</button>
            {error && <div className="form-error">{error}</div>}
        </form>
    );
}

export default ExerciseForm;