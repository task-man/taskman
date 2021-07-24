import './SideBar.css'

function SideBar() {

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
                <button className="button-logout">
                <i className="fas fa-sign-out-alt"></i>
                    Logout</button>
                <hr className="horizontal-line" />
                <div className="sidebar-footer-text">
                    <a href="/#">Feedback</a> <br/>
                    <a href="/#">Suggestions</a>                    
                </div>
            </div>
        </div>
    )
}

export default SideBar;