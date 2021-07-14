import './App.css';
import Login from './components/authentication/Login';
import Dashboard from './components/dashboard/Dashboard'
import ErrorLoad from './components/error/ErrorLoad';
import {BrowserRouter as Router,Switch ,Route}  from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact strict path="/login" component={Login} />
          <Route exact strict path="/dashboard" component={Dashboard} />
          <Route exact strict path="/auth/error" component={ErrorLoad} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
