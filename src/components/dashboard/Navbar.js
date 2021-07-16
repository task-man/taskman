import './Navbar.css'
import { useHistory } from "react-router";

function Navbar() {
    const history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem('token')
        history.push('/login');
    }

    return (
        <nav>
            <input type="checkbox" id="check" ></input>
            <label for="check" className="checkbtn">
                <i className="fas fa-bars"></i>
            </label>
            <label className="logo">Task Manager</label>
            <ul>
                <li><a href="/#">Home</a></li>
                <li><a href="/#">Task</a></li>
                <li><a href="/#">Contact</a></li>
                <li><a href="/#">Services</a></li>
            </ul>
            <button className="btn-logout" onClick={handleLogout}>Logout</button>
        </nav>
    )
}

export default Navbar;