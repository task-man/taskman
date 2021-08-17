import './SideBar.css'
import axios from "axios";
import { useHistory } from "react-router";
import { useState } from "react";

const active_state = {
    taskActive: 'list-active',
    statActive: 'list',
    notifyActive: 'list',
    settingsActive: 'list',
    chatActive: 'list'
}

function SideBar(props) {

    const history = useHistory();

    const [active, setActive] = useState(active_state);

    // For logout
    const handleLogout = () => {
        let token = localStorage.getItem("token");

        if (token) {
            axios.post('/users/logout', { name: "Logout User", id: localStorage.getItem("user_id") },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).then(response => {
                    localStorage.removeItem("token")
                    localStorage.removeItem("user_id")
                    history.push('/login');
                })
        }
    }

    const handleTaskActive = () => {
        history.push('/task')
        if (active.taskActive === 'list') {
            setActive({ ...setActive, taskActive: 'list-active', statActive: 'list', notifyActive: 'list', settingsActive: 'list' })
        }
        else {
            setActive({ ...setActive, taskActive: 'list', statActive: 'list', notifyActive: 'list', settingsActive: 'list' })
        }
    }

    const handleTaskChat = () => {
        history.push('/join')
        if (active.chatActive === 'list') {
            setActive({ ...setActive, chatActive: 'list-active', taskActive: 'list', statActive: 'list', notifyActive: 'list', settingsActive: 'list' })
        }
        else {
            setActive({ ...setActive, chatActive: 'list', taskActive: 'list', statActive: 'list', notifyActive: 'list', settingsActive: 'list' })
        }
    }

    return (
        <div className="sidebar">
            <i class="fas fa-angle-double-left" id="icon-back" onClick={props.handleSideBar}></i>
            <div className="header-logo">
                <i className="fab fa-joomla"></i>
                LOGO
            </div>
            <ul className="ul-icons">
                <li className={active.taskActive} onClick={handleTaskActive}>
                    <i className="fas fa-tasks"></i>
                    Tasks
                </li>
                <li className={active.statActive}>
                    <i className="fas fa-chart-line"></i>
                    Statistics
                </li>
                <li className={active.notifyActive}>
                    <i className="fas fa-bell"></i>
                    Notifications
                </li>
                <li className={active.settingsActive}>
                    <i className="fas fa-cog"></i>
                    Settings
                </li>
                <li className={active.chatActive} onClick={handleTaskChat}>
                <i class="fas fa-comment-alt"></i>
                    Chat
                </li>
            </ul>
            <div className="sidebar-footer">
                <button onClick={handleLogout} className="button-logout">
                    <i className="fas fa-sign-out-alt"></i>
                    Logout
                </button>
                <hr className="horizontal-line" />
                <div className="sidebar-footer-text">
                    <a href="/#">Feedback</a> <br />
                    <a href="/#">Suggestions</a>
                </div>
            </div>
        </div>
    )
}

export default SideBar;