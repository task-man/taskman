import './Task.css'
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
        history.push('/task/'+id)
     }

    const handleDeleteTask = (id) => {
        axios.delete('/tasks/' + id, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    }

    return (
        <div className="Row">
            <div className="Col">
                <input type="text" className="search-box"></input>
                <button className="btn-add-task" onClick={handleAddTask}>Add Task</button>

            </div>
            <table id="customers">
                <tr>
                    <th>Task Description</th>
                    <th>Status</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                {
                    task.map(
                        task => <tr key={task._id}>
                            <td>{task.description}</td>
                            <td>{task.completed ? "Completed" : "Not Completed"}</td>
                            <td><button className="btn-edit-task" onClick={()=>handleEditTask(task._id)}>Edit Task</button></td>
                            <td><button className="btn-remove-task" onClick={()=>handleDeleteTask(task._id)}>Delete</button></td>
                        </tr>
                    )
                }
            </table>
        </div>
    )
}

export default Task;