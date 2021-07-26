import './Task.css'
import ProfileImg from '../../images/Profilen.png'
import SideBar from "./SideBar";
import {useState, useEffect} from "react";
import {useHistory} from "react-router";
import axios from 'axios'
import moment from "moment";
import {Editor} from "react-draft-wysiwyg";
import {EditorState} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import {convertToRaw} from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Parser from 'html-react-parser';


function Task() {

    const [tasks, setTasks] = useState([]);
    const [incomplete, setIncomplete] = useState(0);
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty(),);
    const [taskArea, setTaskArea] = useState("textarea");

    const history = useHistory();

    let token = localStorage.getItem("token");

    useEffect(() => {
        get_task_lists();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const get_task_lists = () => {
        if (token) {
            axios.get('/tasks?sortBy=createdAt:asc', {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
                .then(response => {
                    setTasks(response.data)
                    setIncomplete(0)
                    response.data.forEach((task) => {
                        if (task.completed === false) {
                            setIncomplete(count => count + 1)
                        }
                    })
                })
        } else {
            history.push('/login');
        }
    }

    const handleAddTask = () => {
        const value = draftToHtml(convertToRaw(editorState.getCurrentContent()))

        if (token) {
            if (value.length === 8) {
                setTaskArea("textarea")
            } else {
                axios.post('/tasks', {description: value}, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
                    .then(response => {
                        setEditorState(EditorState.createEmpty())
                        get_task_lists()
                    })
            }
        } else {
            history.push('/login');
        }
    }

    const onContentStateChange = (editorState) => {
        setEditorState(editorState)
        setTaskArea("textarea")
    };

    const handleEditTask = (id) => {
        history.push('/task/' + id)
    }

    const handleDeleteTask = (id) => {
        if (window.confirm("Are you sure?")) {
            axios.delete('/tasks/' + id, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}).then(res => {
                setTasks(tasks.filter(task => task._id !== id))
            })
        }
    }


    return (
        <div>

            <div id="Screen_main">
                <SideBar/>
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
                        <img src={ProfileImg} className="image" alt="some text"/>
                    </div>
                    <div class="card">
                        <div className="card-row-one">
                            <div className="add-task">
                                <Editor
                                    editorState={editorState}
                                    editorClassName={taskArea}
                                    wrapperClassName="editor-wrapper-class"
                                    onEditorStateChange={onContentStateChange}
                                    toolbar={{
                                        inline: {inDropdown: true},
                                        list: {inDropdown: true},
                                        textAlign: {inDropdown: true},
                                        link: {inDropdown: true},
                                        history: {inDropdown: true},
                                    }}
                                />
                                <button className="btn-add-task" onClick={handleAddTask}>Add Task</button>
                            </div>
                            <div className="progress-task">
                                <div className="progress-task-left">
                                    <h3>Progress Task</h3>
                                    <label style={{paddingTop: "3em"}}>Done</label><br/>
                                    <input className="progress-bar-completed"/><br/>
                                    <label style={{paddingTop: "2em"}}>In Progress</label><br/>
                                    <input className="progress-bar-in-progress"/>
                                </div>
                                <div className="progress-task-right">
                                    <div className="circle-border">
                                        <div className="circle">
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

                                <div style={{float: "right"}}>
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
                                                <td>{task.completed ? "Completed" : "Not Completed"}</td>
                                                <td>{moment(task.createdAt).format("DD MMMM, hh:mm A")}</td>
                                                <td><i className="fas fa-edit" id="task-icon"></i></td>
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

                <div className="header-top">
                    <i className="fas fa-bars" id="bars"></i>
                    <img src={ProfileImg} className="image" alt="some text"/>
                    <i className="fas fa-bell" id="bell"></i>

                </div>

                <div className="header-sub">
                    <h3 className="header-user">Hello, Umesh Patel</h3>
                    <p className="header-p-task">You have <span className="header-p-task-count">4 tasks </span>to
                        complete</p>
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
                    <h3>{tasks.length} Task - {incomplete} await to be completed</h3>
                </div>

                <div className="table-m">
                    <div className="tab-row">
                        <input type="checkbox"></input>
                        <i className="fas fa-bars" id="bars-table"></i>
                    </div>
                    {tasks.map((task) =>
                        <>
                            <div key={task._id} className="tab-row-m">
                                <label className="tab-content-l">Task Description</label>
                                <label className="tab-content-r">{task.description}</label>
                            </div>
                            <div className="tab-row-m">
                                <label className="tab-content-l">Date</label>
                                <label
                                    className="tab-content-r">{moment(task.createdAt).format("DD MMMM, hh:mm A")}</label>
                            </div>
                            <div className="tab-row-lm">
                                <label className="tab-content-l">Status</label>
                                <label
                                    className="tab-content-r">{task.completed ? "Completed" : "Not Completed"}</label>
                            </div>


                            <div className="tab-row-last">

                                <i className="fas fa-edit" id="task-icon-l"></i>


                                <i onClick={() => handleDeleteTask(task._id)} className="fas fa-trash-alt"
                                   id="task-icon-r"></i>

                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>


    )
}

export default Task;

