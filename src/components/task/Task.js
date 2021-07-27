import './Task.css'
import ProfileImg from '../../images/Profilen.png'
import SideBar from "./SideBar";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from 'axios'
import moment from "moment";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Parser from 'html-react-parser';
import htmlToDraft from 'html-to-draftjs';


const edit_Task = {
    btn_Name_addtask: "Add Task",
    btn_Name_edittask: "Update Task",
    edit_Task: false,
    id: '',
    complete: false
}

const Pagination = {
    orderBy: "asc"
}

const taskStatus = {
    taskCompleted: '',
    taskInprogress: ''
}

function Task() {

    const [tasks, setTasks] = useState([]);
    const [incomplete, setIncomplete] = useState(0);
    const [complete, setcomplete] = useState(0);
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty(),);
    const [taskArea, setTaskArea] = useState("textarea");
    const [editTask, seteditTask] = useState(edit_Task);
    const [pagination, setPagination] = useState(Pagination);
    const [taskCount, settaskCount] = useState(taskStatus);
    const [sideBar, setsideBar] = useState(false);


    const history = useHistory();

    let token = localStorage.getItem("token");

    useEffect(() => {
        get_task_lists();
        calculate()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const get_task_lists = () => {
        if (token) {
            axios.get('/tasks?sortBy=createdAt:' + pagination.orderBy, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
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

    const  calculate = () => {

        let incomplete;
        let complete;

        tasks.forEach((task) => {
            if (task.completed === false) {
               incomplete += 1
            }
            else if (task.completed === true) {
               complete += 1
            }
        })

        console.log(incomplete)
        const incompleteTask = (incomplete * 100 / tasks.length);

        const completeTask =
            complete * 100 / tasks.length;

        settaskCount({ ...taskCount, taskCompleted: completeTask + "%", taskInprogress: incompleteTask + "%" })
        console.log(taskCount.taskCompleted, taskCount.taskInprogress, incomplete, complete)
    }


    const handleAddTask = () => {
        const value = draftToHtml(convertToRaw(editorState.getCurrentContent()))

        if (token) {
            if (value.length === 8) {
                setTaskArea("textarea")
            } else {
                axios.post('/tasks', { description: value }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
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

    const onEditClick = (id, description, complete) => {

        seteditTask({ ...editTask, edit_Task: true, id: id, complete: complete })

        // const html = '<p>' + description + '</p>';
        const html = description;
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            setEditorState(editorState)
        }
    }

    const handleEditTask = () => {

        const value = draftToHtml(convertToRaw(editorState.getCurrentContent()))

        if (token) {
            axios.patch('/tasks/' + editTask.id, { description: value, completed: editTask.complete }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
                .then(response => {
                    setEditorState(EditorState.createEmpty())
                    get_task_lists()
                    seteditTask({ ...editTask, edit_Task: false })
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

    const handlePagination = (event) => {

        setPagination({ ...pagination, orderBy: event.target.value })

        get_task_lists()
    }

    const handleSideBar = () => {
        setsideBar(true)
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
                                <Editor
                                    editorState={editorState}
                                    editorClassName={taskArea}
                                    wrapperClassName="editor-wrapper-class"
                                    onEditorStateChange={onContentStateChange}
                                    toolbar={{
                                        inline: { inDropdown: true },
                                        list: { inDropdown: true },
                                        textAlign: { inDropdown: true },
                                        link: { inDropdown: true },
                                        history: { inDropdown: true },
                                    }}
                                />
                                {
                                    editTask.edit_Task ? <button className="btn-add-task" onClick={handleEditTask}>{editTask.btn_Name_edittask}</button> :
                                        <button className="btn-add-task" onClick={handleAddTask}>{editTask.btn_Name_addtask}</button>
                                }

                            </div>
                            <div className="progress-task">
                                <div className="progress-task-left">
                                    <h3>Progress Task</h3>
                                    <label style={{ paddingTop: "3em" }}>Done</label><br />
                                    <div className="bar-comp"><span className="bar-progress-comp" style={{
                                        width: taskCount.taskCompleted
                                    }}></span></div><br />
                                    <label style={{ paddingTop: "2em" }}>In Progress</label><br />
                                    <div className="bar-inpr" ><span className="bar-progress-inpr" style={{
                                        width: taskCount.taskInprogress
                                    }}></span></div>
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

                                <div style={{ float: "right" }}>
                                    <button className="btn-fltr-s-task">10</button>
                                    <button className="btn-fltr-s-task">20</button>
                                    <button className="btn-fltr-s-task">30</button>
                                    <select placeholder="Sort by" className="dropdown-task" value={pagination.orderBy} onChange={handlePagination}>
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
                                                <td>{task.completed ? "Done" : "In Progress"}</td>
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
                    <Editor
                        editorState={editorState}
                        editorClassName={taskArea}
                        wrapperClassName="editor-wrapper-class"
                        onEditorStateChange={onContentStateChange}
                        toolbar={{
                            // inline: { inDropdown: true },
                            // list: { inDropdown: true },
                            //textAlign: { inDropdown:true },
                            //  link: { inDropdown: true },
                            //history: { inDropdown: true },
                        }}
                    />

                    {
                        editTask.edit_Task ? <button className="btn-edit-task-m" onClick={handleEditTask}>{editTask.btn_Name_edittask}</button> :
                            <button className="btn-add-task-m" onClick={handleAddTask}>{editTask.btn_Name_addtask}</button>
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

