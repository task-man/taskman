import './Navbar.css'

function Navbar() {

    return (
        <nav>
            <input type="checkbox" id="check" ></input>
            <label for="check" className="checkbtn">
                <i className="fas fa-bars"></i>
            </label>
           <label className="logo">Task Manager</label> 
           <ul>
               <li><a>Home</a></li>
               <li><a>Task</a></li>
               <li><a>Contact</a></li>
               <li><a>Services</a></li>
           </ul>
           
        </nav>
    )
}

export default Navbar;