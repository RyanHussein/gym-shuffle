import axios from "axios";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const ExerciseDetails = ({ exercise, onDelete }) => {

    const handleDelete = async () => {
        const user = localStorage.getItem('user')
        const userData = JSON.parse(user)
    
        if (!userData) {return}

        try {
            const response = await axios.delete('http://localhost:4000/api/exercises/' + exercise._id, {
                headers: {
                    'authorisation': `Bearer ${userData.token}`
                }
            })
            console.log(response.status);
            onDelete(exercise._id);
        } catch (error) {
            console.log(error.message);
            console.log(error.response.data);
        }

    }

    return (  
        <div className="exercise-details">
            <div className="details-header">
                <h4>{exercise.title}</h4>
                <button onClick={handleDelete}>Delete</button>
            </div>
            <p><strong>Mass (Kg): </strong>{exercise.mass}</p>
            <p><strong>Reps: </strong>{exercise.reps}</p>
            <p><strong>Target Muscle: </strong>{exercise.target}</p>
            <p>Added {formatDistanceToNow(new Date(exercise.createdAt), {addSuffix: true})}</p>
        </div>
    );
}
 
export default ExerciseDetails;