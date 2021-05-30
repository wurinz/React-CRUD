import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, useHistory } from 'react-router-dom'
import api from '../api/users'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';


import EditUser from './EditUser';

const UsersList = ({
    usersList
}) => {
    const [ showEdit, setShowEdit ] = useState(false);
    const history = useHistory();


    const handleDelete = async (id) => {
        await api.delete(`/users/${id}`)
    }
    const handleEdit = async (id) => {
        history.push(`/edit/${id}`)
    }

    const renderUsersList = (usersList) => {
        return (
            <ul className="list_container">
                <li className="head">
                    <div className="user_info">
                        <p>Name</p>
                        <p>Email</p>
                    </div>
                </li>
                {usersList.map(user => {
                    return <li 
                        className="user" 
                        key={user.id}
                        >
                            <div className="user_info">
                                <p>{user.name}</p>
                                <p>{user.email}</p>
                            </div>
                            <div>
                                <FontAwesomeIcon style={{color: "orange", fontSize: "25px", cursor: "pointer"}}icon={faEdit} onClick={() => handleEdit(user.id)}/>
                                <FontAwesomeIcon style={{color: "darkred", fontSize: "25px", marginLeft: "20px", cursor: "pointer"}}icon={faTrashAlt} onClick={() => handleDelete(user.id)}/>
                            </div>
                        </li>
                })}
            </ul>
        )
    }

    return(
        <Router >
            <div className="users_container">
                <h1>Users List</h1>
                {renderUsersList(usersList)}
            </div>
            <Route
                path={"/"}
            />
        </Router>
        
    )
}

export default UsersList;