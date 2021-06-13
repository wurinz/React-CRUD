import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import UsersList from './components/UsersList';
import Registration from './components/Registration';
import Login from './components/Login';
import EditUser from './components/EditUser';
import DocumentsList from './components/DocumentsList';

import api from './api/users';




const App = () => {

const [ usersList, setUsersList ] = useState([]);
const [ documentsList, setDocumentsList ] = useState([])

//READ
useEffect(() => {
  const getAllUsers = async () => {
    const allUsers = await api.get("/users");
    if(allUsers){
      setUsersList([...allUsers.data])
    }
  }
  getAllUsers();
}, [])
useEffect(() => {
  const getAllDocuments = async () => {
    const allDocuments = await api.get('/documents'); 
    if(allDocuments){
      setDocumentsList([...allDocuments.data]);
    }
  }
  getAllDocuments();
}, [])


  return (
    <div className="container">
    <Router>

      <Login usersList={usersList}/>
      <Route
        path={'/login'}
        exact={true}
        render={props => <Login {...props} usersList={usersList}/>}
      />
      <Route
        path={'/registration'}
        exact={true}
        render={props => <Registration {...props} usersList={usersList}/>}
      />
      <Route 
        path={'/users'}
        render={props => <UsersList {...props} usersList={usersList}/>}
      />
      <Route
        path={'/documents'}
        render={props => <DocumentsList {...props} documentsList={documentsList}/>}
      />
      <Route 
        path={'/edit'}
        render={props => <EditUser />}
      />
    </Router>
    </div>
  );
}

export default App;