import './App.css';
import Login from './components/authentication/Login';
import Dashboard from './components/dashboard/Dashboard'
import {BrowserRouter as Router,Switch ,Route}  from 'react-router-dom'

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact strict path="/login" component={Login} />
                    <Route exact strict path="/dashboard" component={Dashboard} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;