import './Task.css'
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from 'axios'
import { useParams } from 'react-router-dom';

const task_state = {
    description: '',
    completed: false
}

function EditTask() {

    const [taskName, setTaskName] = useState(task_state);

    const history = useHistory();
    const params = useParams()

    useEffect(() => {

        let token = localStorage.getItem("token");
        if (token) {
            axios.get('/tasks/' + params.id, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
                .then(response => {
                    console.log(response)
                    setTaskName({ ...taskName, description: response.data.description, completed: response.data.completed })
                })
        }
        else {
            history.push('/login');
        }

    }, [params.id])

    const handleEditTask = () => {
        axios.post('/tasks', taskName, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
        history.push('/dashboard');
    }

    return (
        <div className="Row">
            <table id="customers">
                <tr>
                    <th>Task Description</th>
                    <th>Completed</th>
                    <th>Edit</th>
                </tr>

                <tr>
                    <td><input type="text" className="search-box" style={{ width: '350px' }} value={taskName.description} onChange={event =>
                        setTaskName({ ...taskName, description: event.target.value })}></input></td>
                    <td> <select className="search-box" style={{ width: '250px' }} autoFocus={taskName.completed ? true : false}
                        onChange={event =>
                            setTaskName({ ...taskName, completed: event.target.value })}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select></td>
                    <td><button className="btn-add-task" onClick={handleEditTask} style={{ float: 'left' }}>Save Task</button></td>
                </tr>
            </table>
        </div>
    )
}

export default EditTask;