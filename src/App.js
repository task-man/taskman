import './App.css';
import Login from './components/authentication/Login';
import Dashboard from './components/dashboard/Dashboard'
import ErrorLoad from './components/error/ErrorLoad';
import AddTask from './components/dashboard/AddTask'
import EditTask from './components/dashboard/EditTask'
import Task from './components/task/Task';
import {BrowserRouter as Router,Switch ,Route}  from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact strict path="/login" component={Login} />
          <Route exact strict path="/dashboard" component={Dashboard} />
          <Route exact strict path="/auth/error" component={ErrorLoad} />
          <Route exact strict path="/task/add_or_edit" component={AddTask} />
          <Route exact strict path="/task/:id" component={EditTask} />
          <Route exact strict path="/task" component={Task} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
