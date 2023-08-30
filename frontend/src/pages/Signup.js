import { useState } from "react"
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {signup, error, isLoading} = useSignup();

    const handleSumbmit = async (e) => {
        e.preventDefault()

        try {
            await signup(email, password)
        } catch (error) {
            console.log(error.message)
        }
    }

    return (  
        <div className="signup">
            <form className="signup-form" onSubmit={handleSumbmit}>
                <h3>Sign Up</h3>
        
                <label htmlFor="email">Email Address</label>
                <input type="email" id='email' className={error && !email ? "error" : "input"} onChange={(e) => setEmail(e.target.value)} value={email} />
                
                <label htmlFor="password">Password</label>
                <input type="password" id='password' className={error && !password ? "error" : "input"} onChange={(e) => setPassword(e.target.value)} value={password} />

                <button disabled={isLoading} formNoValidate>Signup</button>
                {error && <div className="signup-error">{error}</div>}
            </form>
        </div>
    );
}
 
export default Signup;