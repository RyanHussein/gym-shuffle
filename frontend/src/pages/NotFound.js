import { Link } from "react-router-dom";

const NotFound = () => {
    return (  
        <div className="not-found">
            <h2>404 Page not found</h2>
            <Link to={'/'}>Click here to go back</Link>
        </div>
    );
}
 
export default NotFound;