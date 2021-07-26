import './App.css';
import Login from './components/authentication/Login';
import Task from './components/task/Task';
import {BrowserRouter as Router,Switch ,Route}  from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact strict path="/login" component={Login} />
          <Route exact strict path="/task" component={Task} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
