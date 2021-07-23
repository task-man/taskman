import './SideBar.css'

function SideBar() {

    return (
        <div className="sidebar">
            <div className="header-logo">
                LOGO
            </div>
            <ul className="ul-icons">
                <li>
                    Tasks
                </li>
                <li>
                    Statistics
                </li>
                <li>
                    Notifications
                </li>
                <li>
                    Settings
                </li>
            </ul>
            <button className="button-logout">Logout</button>
            <hr className="horizontal-line"/>
            <div className="sidebar-text-one">
                Feedback
            </div>
            <div className="sidebar-text-two">
                Suggestions
            </div>
        </div>
    )
}

export default SideBar;