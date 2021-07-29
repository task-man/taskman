import './Task.css'
import ProfileImg from '../../images/Profilen.png'
import SideBar from "./SideBar";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from 'axios'
import moment from "moment";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Parser from 'html-react-parser';



const task_state = {
    btn_Name_addtask: "Add Task",
    btn_Name_edittask: "Update Task",
    edit_Task: false,
    id: '',
    description: '',
    complete: false,
    error: 'textarea'
}

const taskStatus = {
    taskCompleted: '',
    taskInprogress: ''
}

function Task() {

    const [tasks, setTasks] = useState([]);
    const [incomplete, setIncomplete] = useState(0);
    const [complete, setcomplete] = useState(0);
    const [taskState, settaskState] = useState(task_state);
    const [taskCount, settaskCount] = useState(taskStatus);
    const [sideBar, setsideBar] = useState(false);


    const history = useHistory();

    let token = localStorage.getItem("token");

    useEffect(() => {
        get_task_lists();
        //window.document.get
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        calculate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [incomplete, complete])

    async function get_task_lists() {
        if (token) {
            await axios.get('/tasks?sortBy=createdAt:asc', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
                .then(response => {
                    setTasks(response.data)
                    setIncomplete(0)
                    response.data.forEach((task) => {
                        if (task.completed === false) {
                            setIncomplete(count => count + 1)
                        }
                        else if (task.completed === true) {
                            setcomplete(count => count + 1)
                        }
                    })
                })

        } else {
            history.push('/login');
        }
    }

    function calculate() {
        const incompleteTask = (incomplete * 100 / tasks.length)

        const completeTask =
            complete * 100 / tasks.length;

        settaskCount({ ...taskCount, taskCompleted: completeTask + "%", taskInprogress: incompleteTask + "%" })
    }

    const handleAddTask = () => {

        if (token) {
            if (taskState.description === '') {
                settaskState({ ...taskState, error: 'textarea-error' })
            } else {
                axios.post('/tasks', { description: taskState.description }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
                    .then(response => {
                        settaskState({ ...taskState, description:'' })
                        get_task_lists()
                    })
            }
        } else {
            history.push('/login');
        }
    }

    const onEditClick = (id, description, complete) => {

        settaskState({ ...taskState, edit_Task: true, id: id, complete: complete, description:description })
    }

    const handleEditTask = () => {

        if (token) {
            axios.patch('/tasks/' + taskState.id, { description: taskState.description, completed: taskState.complete }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
                .then(response => {
                    get_task_lists()
                    settaskState({ ...taskState, edit_Task: false,  description:'' })
                })

        }
        else {
            history.push('/login');
        }
    }

    const handleDeleteTask = (id) => {
        if (window.confirm("Are you sure?")) {
            axios.delete('/tasks/' + id, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).then(res => {
                setTasks(tasks.filter(task => task._id !== id))
            })
        }
        get_task_lists();
    }

    const handleSideBar = () => {

        if (sideBar === true) {
            setsideBar(false)
        }
        else {
            setsideBar(true)
        }

    }

    return (
        <div>
            <div id="Screen_main">
                <SideBar />
                <div className="header">
                    <div className="header-sub-left">
                        <h3 className="header-user">Hello, Umesh Patel</h3>
                        <p className="header-p-task">You have <span
                            className="header-p-task-count">{incomplete} tasks </span>to
                            complete</p>
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
                                <textarea className={taskState.error} value={taskState.description}
                                    onChange={event => settaskState({ ...taskState, description: event.target.value, error: 'textarea' })}
                                    placeholder="Write Task"
                                ></textarea>
                                {
                                    taskState.edit_Task ? <button className="btn-add-task" onClick={handleEditTask}>{taskState.btn_Name_edittask}</button> :
                                        <button className="btn-add-task" onClick={handleAddTask}>{taskState.btn_Name_addtask}</button>
                                }

                            </div>
                            <div className="progress-task">
                                <div className="progress-task-left">
                                    <h3>Progress Task</h3>
                                    <label style={{ paddingTop: "3em" }}>Done</label>
                                    <label style={{ float: "right", paddingTop: "3em" }}>{complete * 100 / tasks.length}%</label><br />
                                    <div className="bar-comp"><span className="bar-progress-comp" style={{
                                        width: taskCount.taskCompleted
                                    }}></span></div><br />
                                    <label style={{ paddingTop: "2em" }}>In Progress</label>
                                    <label style={{ float: "right", paddingTop: "2em" }}>{incomplete * 100 / tasks.length}%</label><br />
                                    <div className="bar-inpr" ><span className="bar-progress-inpr" style={{
                                        width: taskCount.taskInprogress
                                    }}></span></div>
                                </div>
                                <div className="progress-task-right">
                                    <div className="circle-border" style={{ backgroundImage: "linear-gradient(" + (((incomplete * 100 / tasks.length) / 100) * 360) + "deg, transparent 50%, #E53B3B 50%), linear-gradient(0deg, #E53B3B 50%, transparent 50%)" }}>
                                        <div className="circle"> <label className="circle-percent" style={{ paddingTop: "4.2em", paddingLeft: "0.2em" }}>{incomplete * 100 / tasks.length}%</label>
                                        </div>
                                    </div>
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
                                        <option value="asc">Latest Task</option>
                                        <option value="desc">Oldest Task</option>
                                    </select>
                                </div>


                            </div>
                            <div className="task-table-div">
                                <div className="task-table-heading">
                                    <h3>{tasks.length} Task - {incomplete} await to be completed</h3>
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
                                        tasks.map(

                                            task => <tr key={task._id}>

                                                <td>{Parser(task.description)}</td>
                                                <td>{task.completed ? <label className="task-state-done">Done</label>
                                                    : <label className="task-state-inp">In Progress</label>} </td>
                                                <td>{moment(task.createdAt).format("DD MMMM, hh:mm A")}</td>
                                                <td onClick={() => onEditClick(task._id, task.description, task.completed)}
                                                ><i className="fas fa-edit" id="task-icon"></i></td>
                                                <td onClick={() => handleDeleteTask(task._id)}><i
                                                    className="fas fa-trash-alt" id="task-icon"></i></td>
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
                {sideBar ? <SideBar /> : null}
                <div className="header-top">
                    <i className="fas fa-bars" id="bars" onClick={handleSideBar}></i>
                    <img src={ProfileImg} className="image" alt="some text" />
                    <i className="fas fa-bell" id="bell"></i>

                </div>

                <div className="header-sub">
                    <h3 className="header-user">Hello, Umesh Patel</h3>
                    <p className="header-p-task">You have <span className="header-p-task-count">{incomplete} tasks </span>to
                        complete</p>
                </div>

                <div className="add-task-m">
                    <textarea className={taskState.error} value={taskState.description}
                        onChange={event => settaskState({ ...taskState, description: event.target.value, error: 'textarea' })}
                    ></textarea>
                    {
                        taskState.edit_Task ? <button className="btn-edit-task-m" onClick={handleEditTask}>{taskState.btn_Name_edittask}</button> :
                            <button className="btn-add-task-m" onClick={handleAddTask}>{taskState.btn_Name_addtask}</button>
                    }
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
                    <h3>{tasks.length} Task - {incomplete} await to be completed</h3>
                </div>

                {tasks.map((task) =>
                    <>
                        <div className="table-m">
                            <div className="tab-row">
                                <input type="checkbox"></input>
                                <i className="fas fa-bars" id="bars-table"></i>
                            </div>

                            <div key={task._id} className="tab-row-m">
                                <label className="tab-content-l">Task Description</label>
                                <label className="tab-content-r">{Parser(task.description)}</label>
                            </div>
                            <div className="tab-row-m">
                                <label className="tab-content-l">Date</label>
                                <label
                                    className="tab-content-r">{moment(task.createdAt).format("DD MMMM, hh:mm A")}</label>
                            </div>
                            <div className="tab-row-lm">
                                <label className="tab-content-l">Status</label>
                                <label
                                    className="tab-content-r">{task.completed ? "Done" : "In Progress"}</label>

                            </div>

                            <div className="tab-row-last">

                                <i className="fas fa-edit" id="task-icon-l" onClick={() => onEditClick(task._id, task.description, task.completed)}></i>


                                <i onClick={() => handleDeleteTask(task._id)} className="fas fa-trash-alt"
                                    id="task-icon-r"></i>

                            </div>


                        </div>
                    </>
                )}
            </div>

        </div>


    )
}

export default Task;

