import { useState } from "react"
import { useLogin } from "../hooks/useLogin";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login, isLoading, error} = useLogin()

    const handleSumbmit = async (e) => {
        e.preventDefault()

        try {
            await login(email, password)
        } catch (error) {
            console.log(error.message)
        }
    }

    return (  
        <div className="login">
            <form className="login-form" onSubmit={handleSumbmit}>
                <h3>Log In</h3>
        
                <label htmlFor="email">Email Address</label>
                <input type="email" id='email' className={error && !email ? "error" : "input"} onChange={(e) => setEmail(e.target.value)} value={email} />
                
                <label htmlFor="password">Password</label>
                <input type="password" id='password' className={error && !password ? "error" : "input"} onChange={(e) => setPassword(e.target.value)} value={password} />

                <button disabled={isLoading} formNoValidate>Login</button>
                {error && <div className="login-error">{error}</div>}
            </form>
        </div>
    );
}
 
export default Login;