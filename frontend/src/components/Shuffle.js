import { useState } from "react";
const Shuffle = ({onShuffle}) => {
    const [amount, setAmount] = useState(10)
    const [targetFilters, setTargetFilters] = useState('')
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault()

        const user = localStorage.getItem('user')
        const userData = JSON.parse(user)

        if (!userData) {
            setError('Login to shuffle.')
            return
        }

        onShuffle(amount, targetFilters);
    }

    return (  
        <div className="shuffle" onSubmit={handleSubmit}>
            <form className="shuffle-form">
                <h3>Shuffle A New Workout!</h3>

                <label htmlFor="amount">Amount Of Exercises</label>
                <input type="number" id="amount" className={error && !amount ? "error" : "input"} min="1" value={amount} onChange={(e) => setAmount(e.target.value)}/>

                <label htmlFor="target-filter">Target Muscle Filters (Chest-Bicep-Abs...)</label>
                <input type="text" id="target-filter" className={error && !targetFilters ? "error" : "input"} value={targetFilters} onChange={(e) => setTargetFilters(e.target.value)}/>

                <button>Shuffle</button>
                {error && <div className="form-error">{error}</div>}
            </form>
        </div>
    );
}
 
export default Shuffle;