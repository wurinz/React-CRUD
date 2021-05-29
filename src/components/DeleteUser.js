import React from 'react';
import api from '../api/users'

const DeleteUser = (
    { id }
) => {

    const deleteUserHandler =  async (id) => {
        await api.delete(`/users/${id}`)
    }

    return(
        <button 
            className="delete_button"
            onClick={() => deleteUserHandler(id)}    
        >Delete</button>
    )
}

export default DeleteUser;