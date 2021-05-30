import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../api/users';
import { v4 } from 'uuid';
import { Formik } from 'formik';
import * as yup from 'yup';


const Registration = ({
    usersList
}) => {
    const history = useHistory();
    const addUserHandler = async (user) => {
        if(usersList.find(existingUser => existingUser.email === user.email)){
            return alert('User with this email already exists')
        } else if(usersList.find(existingUser => existingUser.name === user.name)){
            return alert('User with this name already exists')
        }
        await api.post("/users", {id: v4(), ...user})
        history.push('/main')
        
        // usersList.find(existingUser => existingUser.email === user.email) ? alert('User with this email already exists') : await api.post("/users", {id: v4(), ...user});
        // usersList.find(existingUser => existingUser.name === user.name) ? alert('User with this name already exists') : await api.post("/users", {id: v4(), ...user});
    }

    const INITIAL_VALUES = {
        name: '',
        email: '',
        password: ''
    }
    const VALIDATION_SCHEMA = yup.object().shape({
        name: yup.string().required("Enter your name please").min(3, "Your name can't be that short"),
        email: yup.string().email("Invalid email").required("Enter your email please"),
        password: yup.string().required('Please input your password!').min(8, 'The password must be at least 8 characters!').matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
    })


    return(
        <div className="registration_container">
            <h1>Create an account</h1>
            <Formik
                initialValues={INITIAL_VALUES}
                validationSchema={VALIDATION_SCHEMA}
                validateOnBlur
                onSubmit={value => addUserHandler(value)}
            >{({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
                <div className="registration_form">
                    <label name="name">Name</label>
                    <div>
                        <input 
                            className="input"
                            type="text"
                            name="name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            placeholder="Your name"
                        />
                        { touched.name && errors.name && <p className="error">{errors.name}</p> }
                    </div>
                    <label name="email">Email</label>
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
                        { touched.email && errors.email && <p className="error">{errors.email}</p> }
                    </div>
                    <div>
                    <label name="password">Password</label>
                    <input 
                            className="input"
                            type="text"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            placeholder="Your password"
                        />
                        { touched.password && errors.password && <p className="error">{errors.password}</p> }
                    </div>
                    <div className="registration_buttons">
                    <button
                        className="register_button"
                        disabled={!isValid && !dirty}
                        onClick={() => {
                            handleSubmit();
                        }}
                        type="submit"
                    >Register</button>
                    <button
                        onClick={() => history.push('/main')}
                        className="back_button"
                        >Go Back</button>
                    </div>
                    
                </div>
            )}
            </Formik>
        </div>
    )
}

export default Registration;