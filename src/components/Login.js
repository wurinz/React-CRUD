import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

const Login = ({
    usersList
}) => {

    const logInHandler = (user) => {
        if(usersList.find(currentUser => currentUser.email === user.email && currentUser.password === user.password)){
            alert('LOGGED IN')
        } else {
            alert('ERROR')
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
                            handleSubmit()
                        }}
                    >Log in</button>
                </div>
            )}
            </Formik>
        </div>
    )
}

export default Login;