import formatDistanceToNow from "date-fns/formatDistanceToNow";

const ShuffledExerciseDetails = ({exercise}) => {
    return (  
        <div className="exercise-details">
            <div className="details-header">
                <h4>{exercise.title}</h4>
            </div>
            <p><strong>Mass (Kg): </strong>{exercise.mass}</p>
            <p><strong>Reps: </strong>{exercise.reps}</p>
            <p><strong>Target Muscle: </strong>{exercise.target}</p>
            <p>Added {formatDistanceToNow(new Date(exercise.createdAt), {addSuffix: true})}</p>
        </div>
    );
}
 
export default ShuffledExerciseDetails;