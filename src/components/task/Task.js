import './Task.css'
import ProfileImg from '../../images/Profilen.png'
import SideBar from "./SideBar";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from 'axios'

function Task() {

    const [task, setTask] = useState([]);
    // const [taskName, setTaskName] = useState(task_state);
    // const [className, setClassName] = useState('modal-add-task');

    const history = useHistory();

    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token) {
            axios.get('/tasks?sortBy=createdAt:asc', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
                .then(response => {
                    setTask(response.data)
                })
        }
        else {
            history.push('/login');
        }

    })

    const handleAddTask = () => {
        history.push('/task/add_or_edit')
    }

    const handleEditTask = (id) => {
        history.push('/task/' + id)
    }

    const handleDeleteTask = (id) => {
        axios.delete('/tasks/' + id, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    }


    return (
        <div>


            <div id="Screen_main">
                <SideBar />
                <div className="header">
                    <div className="header-sub-left">
                        <h3 className="header-user">Hello, Umesh Patel</h3>
                        <p className="header-p-task">You have <span className="header-p-task-count" >4 tasks </span>to complete</p>
                    </div>
                    <div className="header-sub-right">
                        <input className="header-search" type="text" placeholder="Search.."></input>
                        <i className="fas fa-cog" id="setting-icon"></i>
                        <i className="fas fa-bell"></i>
                        <img src={ProfileImg} className="image" alt="some text" />

                    </div>
                    <div class="card">
                        <div className="card-row-one">
                            <div className="add-task">
                                <textarea className="textarea"></textarea>
                                <button className="btn-add-task">Add Task</button>
                            </div>
                            <div className="progress-task">
                                <div className="progress-task-left">
                                    <h3>Progress Task</h3>
                                    <label style={{ paddingTop: "3em" }}>Done</label>
                                    <input className="progress-bar"></input>
                                    <label style={{ paddingTop: "2em" }}>In Progress</label>
                                    <input className="progress-bar"></input>
                                    <label style={{ paddingTop: "2em" }}>Await to Start</label>
                                    <input className="progress-bar"></input>
                                </div>
                                <div className="progress-task-right">
                                    <input className="progress-circle"></input>
                                </div>
                            </div>
                        </div>
                        <div className="card-row-two">
                            <div className="task-heading">
                                <h3>Task List</h3>
                            </div>
                            <div className="task-filter">

                                <button className="btn-fltr-task">All time</button>
                                <button className="btn-fltr-task">Status</button>
                                <button className="btn-fltr-m-task">More filter +</button>

                                <div style={{ float: "right" }}>
                                    <button className="btn-fltr-s-task">10</button>
                                    <button className="btn-fltr-s-task">20</button>
                                    <button className="btn-fltr-s-task">30</button>
                                    <select placeholder="Sort by" className="dropdown-task">
                                        <option value="volvo">Latest Task</option>
                                    </select>
                                </div>


                            </div>
                            <div className="task-table-div">
                                <div className="task-table-heading">
                                    <h3>256 Task - 4 await to be completed</h3>
                                </div>
                                <table className="task-table">
                                    <tr>
                                        <th>Task Description</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                    {
                                        task.map(
                                            task => <tr key={task._id}>
                                                <td>{task.description}</td>
                                                <td>{task.completed ? "Completed" : "Not Completed"}</td>
                                                <td>{task.completed ? "Completed" : "Not Completed"}</td>
                                                <td><i className="fas fa-edit" id="task-icon"></i></td>
                                                <td><i className="fas fa-trash-alt" id="task-icon"></i></td>
                                            </tr>
                                        )
                                    }
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="Screen_mobile">

                <div className="header-top">
                    <i className="fas fa-bars" id="bars"></i>
                    <img src={ProfileImg} className="image" alt="some text" />
                    <i className="fas fa-bell" id="bell"></i>

                </div>

                <div className="header-sub">
                    <h3 className="header-user">Hello, Umesh Patel</h3>
                    <p className="header-p-task">You have <span className="header-p-task-count" >4 tasks </span>to complete</p>
                </div>

                <div className="add-task-m">
                    <textarea className="textarea-m"></textarea>
                    <button className="btn-add-task-m">Add Task</button>
                </div>

                <div className="task-head">
                    <h3>Task List</h3>
                </div>

                <div className="btn-fltr">

                    <button className="btn-fltr-task-m">All time</button>
                    <button className="btn-fltr-task-m">Status</button>
                    <button className="btn-fltr-m-task-m">More filter +</button>

                </div>

                <div className="task-table-heading-m">
                    <h3>256 Task - 4 await to be completed</h3>
                </div>

                <div className="table-m">
                    <div className="tab-row">
                        <input type="checkbox"></input>
                        <i className="fas fa-bars" id="bars-table"></i>
                    </div>
                    <div className="tab-row-m">
                        <label className="tab-content-l">Task Description</label>
                        <label className="tab-content-r">First Task</label>
                    </div>
                    <div className="tab-row-m">
                        <label className="tab-content-l">Date</label>
                        <label className="tab-content-r">10/20/2021</label>
                    </div>
                    <div className="tab-row-lm">
                        <label className="tab-content-l">Status</label>
                        <label className="tab-content-r">10/20/2021</label>
                    </div>
                    <div className="tab-row-last">
                        
                        <i className="fas fa-edit" id="task-icon-l"></i>
                        
                        
                        <i className="fas fa-trash-alt" id="task-icon-r"></i>
                        
                    </div>

                </div>

            </div>

        </div>


    )
}

export default Task;

