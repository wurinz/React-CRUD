import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';


const EditUser = ({
    id
}) => {

    const editHandler = async () => {

    }
    
    const INITIAL_VALUES = {
        name: '',
        email: '', 
        password: ''
    }
    const VALIDATION_SCHEMA = yup.object().shape({
        name: yup.string().required('Enter your new name').min(3, 'Your name can\'t be that short'),
        email: yup.string().required('Enter your email').email('invalid email'),
        password: yup.string().required('Enter your password')
    })

    return(
        <div className="edit_container">
            <h1>Edit User</h1>
            <Formik
                initialValues={INITIAL_VALUES}
                validationSchema={VALIDATION_SCHEMA}
                validateOnBlur
                onSubmit={value => {
                    editHandler(value);
                    console.log('edited');
                }}
            >{({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
                <div className="edit_form">
                    <label name="Name">Name</label>
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
                        { touched.name && errors.name && <p className="error">{errors.name}</p>}
                    </div>
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
                    <label name="password">Password</label>
                    <div>
                        <input 
                            className="input"
                            type="text"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Your password"
                        />
                        { touched.password && errors.password && <p className="error">{errors.password}</p>}
                    </div>
                    <button
                        className="update_button"
                        disabled={!isValid && !dirty}
                        onClick={() => {
                            handleSubmit();
                        }}
                    >Update</button>
                </div>
            )}

            </Formik>
        </div>
    )
}

export default EditUser;