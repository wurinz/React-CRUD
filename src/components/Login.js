import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

const Login = ({
    usersList
}) => {

    const [ isLoggedIn, setIsLoggedIn ] = useState(false)
    const history = useHistory();
    
    const logInHandler = (user) => {
        if(usersList.find(currentUser => currentUser.email === user.email && currentUser.password === user.password)){
            history.push("/users");
            localStorage.setItem("isLoggedIn", true);
            setIsLoggedIn(localStorage.getItem("isLoggedIn"));
        } else {
            alert('Wrong email or password')
        }
    }

    const INITIAL_VALUES = {
        email: '', 
        password: ''
    }
    const VALIDATION_SCHEMA = yup.object().shape({
        email: yup.string().required('Enter your email').email('invalid email'),
        password: yup.string().required('Enter your password')
    })
    
    if(localStorage.getItem("isLoggedIn") === "false" || localStorage.getItem("isLoggedIn") === 'null'){
        return(
            <div className="login_container">
                <h1>Log in</h1>
                <Formik
                    initialValues={INITIAL_VALUES}
                    validationSchema={VALIDATION_SCHEMA}
                    validateOnBlur
                    onSubmit={value => {
                        logInHandler(value)
                        console.log(value);
                    }}
                >{({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty  }) => (
                    <div className="login_form">
                            <label name="Email">Email</label>
                        <div>
                            <input 
                                className="input"
                                type="text"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                placeholder="Your email"
                            />
                            { touched.email && errors.email && <p className="error">{errors.email}</p>}
                        </div>
                        <label name="Email">Password</label>
                        <div>
                            <input 
                                className="input"
                                type="text"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                placeholder="Your password"
                            />
                            { touched.password && errors.password && <p className="error">{errors.password}</p>}
                        </div>
                        <button 
                            className="button login_button"
                            disabled={!isValid && !dirty}
                            onClick={() => {
                                handleSubmit();
                            }}
                        >Log in</button>
                    </div>
                )}
                </Formik>
                <h2>Don't have an account?</h2>
                <Link to="/registration">
                    <button className="register_button">Registration</button>
                </Link>
            </div>
        )
    } else { 
        return(
            <div className="logout_container">
                <div className="header_nav">
                    <Link to="/users">
                        <button className="users_button">
                            Users
                        </button>
                    </Link>
                    <Link to="/documents">
                        <button className="documents_button">
                            Documents
                        </button>
                    </Link>
                </div>
                
                <button 
                    className="logout_button"
                    onClick={() => {
                        setIsLoggedIn(false);
                        history.push('/');
                        localStorage.setItem('isLoggedIn', false);
                    }}
                >Log out</button>
            </div>
        )
    }
    
}

export default Login;