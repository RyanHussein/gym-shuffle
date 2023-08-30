import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout';

const Navbar = () => {
    const {logout} = useLogout()
    const user = localStorage.getItem('user')
    const userData = JSON.parse(user)

    const handleLogout = () => {
        logout()
    }

    return (  
        <nav className="navbar">
            <div className="nav-container">
                <div className='title-logo'>
                    <Link to={'/'}><h1>GymShuffle</h1></Link>
                    <img width="48" height="48" src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/48/000000/external-shuffle-essentials-pack-tanah-basah-glyph-tanah-basah.png" alt="logo"/>
                </div>

                {userData && (
                    <div className="email-logout">
                        <span>{userData.email}</span>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                )}
                
                {!userData && (
                    <div className="signup-logout">
                        <Link to={'/signup'}>Signup</Link>
                        <Link to={'/login'}>Login</Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
 
export default Navbar;