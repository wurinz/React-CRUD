import React, { useState } from 'react';
import DeleteUser from './DeleteUser';
import EditUser from './EditUser';

const UsersList = ({
    usersList
}) => {
    const [ showEdit, setShowEdit ] = useState(false);
    const renderUsersList = (usersList) => {
        return (
            <ul className="users_container">
                {usersList.map(user => {
                    return <li 
                        className="user" 
                        key={user.id}
                        >   
                        {user.name}
                        <button onClick={() => {
                            setShowEdit(!showEdit)
                        }}>Edit</button>
                        <DeleteUser id={user.id} usersList={usersList} />
                        </li>
                })}
            </ul>
        )
    }

    return(
        <div>
            <h1>Users List</h1>
            {renderUsersList(usersList)}
        </div>
    )
}

export default UsersList;