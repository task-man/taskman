import './Task.css'
import Profileimg from '../../images/Profilen.png'

function Task() {

    return (
        <div id="Screen_main">

            <div className="header">
                <div className="header-sub-left"> 
                <h3 className="header-user">Hello, Umesh Patel</h3>
                <p className="header-p-task">You have <span className="header-p-task-count" >4 tasks </span>to complete</p>
                </div>

               <div className="header-sub-right">
               <input className="header-search" type="text" placeholder="search.."></input>
                <i className="fas fa-cog"></i>
                <i className="fas fa-bell"></i>
                <img src={Profileimg} className="image" alt="some text" />
               </div>
                
            </div>
        </div>

    )
}

export default Task;

