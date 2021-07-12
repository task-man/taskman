import { useState } from "react";
import axios from 'axios'
import './Login.css'
import loginImg from '../../images/login.svg'
import signupImg from '../../images/signup.svg'

//initial login state
const login_state = {
    email: '',
    password: '',
}

//initial sign up state
const signup_state = {
    username: '',
    email: '',
    password: '',
}

function Login() {

    const [className, setClassName] = useState('container');
    const [loginObject, setloginObject] = useState(login_state)
    const [signUpObject, setSignUpObject] = useState(signup_state)

    // Handle form submit
    const handleLoginSubmit = (event) => {
        event.preventDefault();

        axios.post('https://umesh-task-manager.herokuapp.com/users/login', loginObject)
            .then(response => {
                console.log(response)
            });

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
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="email" placeholder="Email" value={loginObject.email}
                                   onChange={event => setloginObject({ ...loginObject, email: event.target.value })}
                            ></input>
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password" value={loginObject.password}
                                   onChange={event => setloginObject({ ...loginObject, password: event.target.value })}
                            ></input>
                        </div>
                        <div className="error-field-hide">
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

                    <form className="sign-up-form" onSubmit={handleLoginSubmit}>
                        <h2 className="title">Sign up</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Username" value={signUpObject.username}
                                   onChange={event => setSignUpObject({ ...signUpObject, username: event.target.value })}
                            ></input>
                        </div>
                        <div className="input-field">
                            <i className="fas fa-envelope"></i>
                            <input type="text" placeholder="Email" value={signUpObject.email}
                                   onChange={event => setSignUpObject({ ...signUpObject, email: event.target.value })}
                            ></input>
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password" value={signUpObject.password}
                                   onChange={event => setSignUpObject({ ...signUpObject, password: event.target.value })}
                            ></input>
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

                    <img src={loginImg} className="image" alt="some text" />
                </div>

                <div className="panel right-panel">
                    <div className="content">
                        <h3>One of us?</h3>
                        <p>Sign in to get into a larger and awesome web application!</p>
                        <button className="btn transparent" id="sign-in-btn" onClick={removeSignUpMode}>Sign in</button>

                    </div>

                    <img src={signupImg} className="image" alt="some text" />
                </div>
            </div>
        </div>
    )
}

export default Login;