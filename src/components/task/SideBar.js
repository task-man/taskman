import './SideBar.css'
import axios from "axios";
import { useHistory } from "react-router";
import { useState, useEffect } from "react";


function SideBar(props) {

    const history = useHistory();

    const [taskactive, settaskActive] = useState("list-active");
    const [chatactive, setchatActive] = useState("list");

    useEffect(() => {
       
        if (window.location.pathname.toLowerCase() === "/join" || window.location.pathname.toLowerCase() === "/chat") {
            setchatActive("list-active")
            settaskActive("list")
        }

        if (window.location.pathname.toLowerCase() === "/task") {
            settaskActive("list-active")
            setchatActive("list")
        }
        //window.document.get
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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


        if (window.location.pathname.toLowerCase() === "/task") {
            settaskActive("list-active")
            setchatActive("list")
        }

        else
            settaskActive("list")


        //console.log(taskactive);

    }

    const handleTaskChat = () => {

        history.push('/join')

        if (window.location.pathname.toLowerCase() === "/join") {
            setchatActive("list-active")
            settaskActive("list")
        }

        else
            setchatActive("list")


        //console.log(chatactive);

    }

    return (
        <div className="sidebar">
            <i class="fas fa-angle-double-left" id="icon-back" onClick={props.handleSideBar}></i>
            <div className="header-logo">
                <i className="fab fa-joomla"></i>
                LOGO
            </div>
            <ul className="ul-icons">
                <li className={taskactive} onClick={handleTaskActive}>
                    <i className="fas fa-tasks"></i>
                    Tasks
                </li>
                <li className="list">
                    <i className="fas fa-chart-line"></i>
                    Statistics
                </li>
                <li className="list">
                    <i className="fas fa-bell"></i>
                    Notifications
                </li>
                <li className="list">
                    <i className="fas fa-cog"></i>
                    Settings
                </li>
                <li className={chatactive} onClick={handleTaskChat}>
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