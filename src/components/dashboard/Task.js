import './Task.css'

function Task() {

    return (
        <div className="Row">
            <div className="Col">
                <input type="text" className="search-box"></input>
                <button className="btn-add-task">Add Task</button>

            </div>
            <table id="customers">
                <tr>
                    <th>Task Description</th>
                    <th>Status</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                <tr>
                    <td>Alfreds Futterkiste</td>
                    <td>Maria Anders</td>
                    <td><button className="btn-edit-task">Edit Task</button></td>
                    <td><button className="btn-remove-task">Delete</button></td>
                </tr>
            </table>
        </div>

    )
}

export default Task;