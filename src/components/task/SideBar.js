import './SideBar.css'
import axios from "axios";
import {useHistory} from "react-router";

function SideBar() {

    const history = useHistory();

    // For logout
    const handleLogout = () => {
        let token = localStorage.getItem("token");

        if (token) {
            axios.post('/users/logout', {name: "Logout User", id: localStorage.getItem("user_id")},
                {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}).then(response => {
                localStorage.removeItem("token")
                localStorage.removeItem("user_id")
                history.push('/login');
            })
        }
    }

    return (
        <div className="sidebar">
            <div className="header-logo">
                <i className="fab fa-joomla"></i>
                LOGO
            </div>
            <ul className="ul-icons">
                <li>
                    <i className="fas fa-tasks"></i>
                    Tasks
                </li>
                <li>
                    <i className="fas fa-chart-line"></i>
                    Statistics
                </li>
                <li>
                    <i className="fas fa-bell"></i>
                    Notifications
                </li>
                <li>
                    <i className="fas fa-cog"></i>
                    Settings
                </li>
            </ul>
            <div className="sidebar-footer">
                <button onClick={handleLogout} className="button-logout">
                    <i className="fas fa-sign-out-alt"></i>
                    Logout
                </button>
                <hr className="horizontal-line"/>
                <div className="sidebar-footer-text">
                    <a href="/#">Feedback</a> <br/>
                    <a href="/#">Suggestions</a>
                </div>
            </div>
        </div>
    )
}

export default SideBar;