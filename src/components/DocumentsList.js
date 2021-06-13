import React, { useState } from 'react';
import api from '../api/users'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';



const DocumentsList = ({
    documentsList
}) => {
    const [ file, setFile ] = useState(null);

    const hadnleFile = (event) => {
        console.log(event.target.files);
        const currentFile = event.target.files[0];
        console.log(currentFile);
        setFile(currentFile);
    }

    const handleUpload = async () => {
        console.log(file)
        const currentFile = file;

        let formData = new FormData();
        formData.append('image', currentFile);
        await api.post('/documents', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    }

    const renderDocumentsList = (documentsList) => {
        return (
            <ul className="list_container">
                <li className="head">
                    <div className="document_info">
                        <p>Name</p>
                        <div className="document_interaction">
                            <input 
                                className="upload_input"
                                type="file" 
                                name="file" 
                                onChange={(event) => hadnleFile(event)}/> 
                            <button
                                className="upload_button"
                                onClick={(event) => handleUpload(event)}

                            >Upload</button>
                        </div>
                        
                    </div>
                </li>
                {documentsList.map((document, index) => {
                    return <li
                        className="document"
                        key={index}
                    >
                        <div className="document_info">
                            <p>{document.name}</p>
                        </div>
                        <div>
                            <FontAwesomeIcon style={{color: "orange", fontSize: "25px", cursor: "pointer"}} icon={faFileDownload}/>
                            <FontAwesomeIcon style={{color: "darkred", fontSize: "25px", cursor: "pointer", marginLeft: "20px"}} icon={faTrashAlt} />
                        </div>
                    </li>
                })}
            </ul>
        )
    }

    return(
        <div className="documents_container">
            <h1>Documents List</h1>
            {renderDocumentsList(documentsList)}
        </div>
    )
}

export default DocumentsList;