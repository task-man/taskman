import './App.css';
import Login from './components/authentication/Login';
import Task from './components/task/Task';
import Message from "./components/chat/Message";
import Join from './components/chat/Join';
import {BrowserRouter as Router,Switch ,Route}  from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact strict path="/login" component={Login} />
          <Route exact strict path="/" component={Login} />
          <Route exact strict path="/task" component={Task} />
            <Route exact strict path="/chat" component={Message} />
          <Route exact strict path="/join" component={Join} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
