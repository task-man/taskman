import {useState} from "react";
import axios from 'axios'
import './Login.css'
import loginImg from '../../images/login.svg'
import signupImg from '../../images/signup.svg'
import {useHistory} from "react-router";

//initial login state
const login_state = {
    email: '',
    password: '',
    login_email: 'input-field',
    login_password: 'input-field',
    error_field: 'error-field-hide'
}

//initial sign up state
const signup_state = {
    username: '',
    email: '',
    password: '',
    signup_username: 'input-field',
    signup_email: 'input-field',
    signup_password: 'input-field',
    error_field: 'error-field-hide'
}

function Login() {

    const history = useHistory();
    const [className, setClassName] = useState('container');
    const [loginObject, setloginObject] = useState(login_state)
    const [signUpObject, setSignUpObject] = useState(signup_state)

    // Handle login form submit
    const handleLoginSubmit = (event) => {
        event.preventDefault();

        const login_parameter = {
            email: loginObject.email,
            password: loginObject.password,
        }

        if (loginObject.email === '') {
            setloginObject({...loginObject, login_email: 'error-input-field'})
        } else if (loginObject.password === '') {
            setloginObject({...loginObject, login_password: 'error-input-field'})
        } else {
            axios.post('https://umesh-task-manager.herokuapp.com/users/login', login_parameter)
                .then(response => {
                    console.log(response);
                    let state_value = response.status
                    if (state_value === 200) {
                        localStorage.setItem('token', response.data.token)
                        history.push('/dashboard');
                    }
                    localStorage.setItem("access-token", response.data);
                }).catch(error => {
                    let state_value = error.response.status
                    if (state_value === 400)
                        setloginObject({...loginObject, error_field: 'error-field-show'})
                }
            );
        }

    }

    // Handle sign up form submit
    const handleSignupSubmit = (event) => {
        event.preventDefault();

        const signup_parameter = {
            name: signUpObject.username,
            email: signUpObject.email,
            password: signUpObject.password,
        }

        if (signUpObject.username === '') {
            setSignUpObject({...signUpObject, signup_username: 'error-input-field'})
        } else if (signUpObject.email === '') {
            setSignUpObject({...signUpObject, signup_email: 'error-input-field'})
        } else if (signUpObject.password === '') {
            setSignUpObject({...signUpObject, signup_password: 'error-input-field'})
        } else {
            axios.post('https://umesh-task-manager.herokuapp.com/users', signup_parameter)
                .then(response => {
                    console.log(response);
                    let state_value = response.status
                    if (state_value === 200) {
                        localStorage.setItem('token', response.data.token)
                        history.push('/dashboard');
                    }
                    localStorage.setItem("access-token", response.data);
                }).catch(error => {
                    console.log(error.response)
                    let state_value = error.response.status
                    if (state_value === 503)
                        setloginObject({...loginObject, error_field: 'error-field-show'})
                }
            );
        }

    }

    const addSignUpMode = () => {
        setClassName('container sign-up-mode')
    }

    const removeSignUpMode = () => {
        setClassName('container')
    }

    return (
        <div className={className}>
            <div className="form-container">
                <div className="signin-signup">

                    {/* Sign in form */}

                    <form className="sign-in-form" onSubmit={handleLoginSubmit}>
                        <h2 className="title">Sign in</h2>
                        <div className={loginObject.login_email}>
                            <i className="fas fa-user"></i>
                            <input type="email" placeholder="Email" value={loginObject.email}
                                   onChange={event => setloginObject({
                                       ...loginObject, email: event.target.value,
                                       login_email: 'input-field', error_field: 'error-field-hide'
                                   })}
                            ></input>
                        </div>
                        <div className={loginObject.login_password}>
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password" value={loginObject.password}
                                   onChange={event => setloginObject({
                                       ...loginObject, password: event.target.value,
                                       login_password: 'input-field', error_field: 'error-field-hide'
                                   })}
                            ></input>
                        </div>
                        <div className={loginObject.error_field}>
                            <label className="sign-in-label">Invalid Username or Password</label>
                        </div>
                        <input type="submit" value="Login" className="btn solid"></input>
                        <p className="social-text">Or Sign in with social platforms</p>
                        <div className="social-media">
                            <a href="/#" className="social-icon">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="/#" className="social-icon">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="/#" className="social-icon">
                                <i className="fab fa-google"></i>
                            </a>
                            <a href="/#" className="social-icon">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>

                    </form>

                    {/* Sign up form */}

                    <form className="sign-up-form" onSubmit={handleSignupSubmit}>
                        <h2 className="title">Sign up</h2>
                        <div className={signUpObject.signup_username}>
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Username" value={signUpObject.username}
                                   onChange={event => setSignUpObject({
                                       ...signUpObject, username: event.target.value,
                                       signup_username: 'input-field', error_field: 'error-field-hide'
                                   })}
                            ></input>
                        </div>
                        <div className={signUpObject.signup_email}>
                            <i className="fas fa-envelope"></i>
                            <input type="text" placeholder="Email" value={signUpObject.email}
                                   onChange={event => setSignUpObject({
                                       ...signUpObject, email: event.target.value,
                                       signup_email: 'input-field', error_field: 'error-field-hide'
                                   })}
                            ></input>
                        </div>
                        <div className={signUpObject.signup_password}>
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password" value={signUpObject.password}
                                   onChange={event => setSignUpObject({
                                       ...signUpObject, password: event.target.value,
                                       signup_password: 'input-field', error_field: 'error-field-hide'
                                   })}
                            ></input>
                        </div>
                        <div className={signUpObject.error_field}>
                            <label className="sign-up-label">Invalid Email or Email already exist</label>
                        </div>
                        <input type="submit" value="Sign up" className="btn solid"></input>
                        <p className="social-text">Or Sign up with social platforms</p>
                        <div className="social-media">
                            <a href="/#" className="social-icon">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="/#" className="social-icon">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="/#" className="social-icon">
                                <i className="fab fa-google"></i>
                            </a>
                            <a href="/#" className="social-icon">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>

                    </form>

                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3>New here?</h3>
                        <p>Sign up to get into a larger and awesome web application!</p>
                        <button className="btn transparent" id="sign-up-btn" onClick={addSignUpMode}>Sign up</button>

                    </div>

                    <img src={loginImg} className="image" alt="some text"/>
                </div>

                <div className="panel right-panel">
                    <div className="content">
                        <h3>One of us?</h3>
                        <p>Sign in to get into a larger and awesome web application!</p>
                        <button className="btn transparent" id="sign-in-btn" onClick={removeSignUpMode}>Sign in</button>

                    </div>

                    <img src={signupImg} className="image" alt="some text"/>
                </div>
            </div>
        </div>
    )
}

export default Login;