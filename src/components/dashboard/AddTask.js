import './Task.css'
import { useState } from "react";
import { useHistory } from "react-router";
import axios from 'axios'

const task_state = {
    description: ''
}

function AddTask() {

    const [taskName, setTaskName] = useState(task_state);
    // const [className, setClassName] = useState('modal-add-task');

    const history = useHistory();

    // useEffect(() => {
    //     let token = localStorage.getItem("token");
    //     if (token) {
    //         axios.get('/tasks?sortBy=createdAt:asc', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    //             .then(response => {
    //                 setTask(response.data)
    //             })
    //     }
    //     else {
    //         history.push('/login');
    //     }

    // })

    const handleAddTask = () => {
        axios.post('/tasks', taskName, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
        history.push('/dashboard');
    }

    return (
        <div className="Row">
            <table id="customers">
                <tr>
                    <th>Task Description</th>
                    <th>Add</th>
                </tr>

                <tr>
                    <td><input type="text" className="search-box" style={{width:'450px'} } onChange={event => 
                        setTaskName({...taskName,description:event.target.value})}></input></td>
                    <td><button className="btn-add-task" onClick={handleAddTask} style={{float:'left'}}>Add Task</button></td>
                </tr>
            </table>
        </div>
    )
}

export default AddTask;