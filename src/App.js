import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import UsersList from './components/UsersList';
import Registration from './components/Registration';
import Login from './components/Login'
import api from './api/users';




const App = () => {

const [ usersList, setUsersList ] = useState([]);
const [ showRegistration, setshowRegistration ] = useState(false);

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



  return (
    <div className="container">
    <Router>
      <Login usersList={usersList}/>
      <Route
        path={'/login'}
        render={props => <Login {...props} usersList={usersList}/>}
      />
      <Route
        path={'/registration'}
        render={props => <Registration {...props} usersList={usersList}/>}
      />
      <Route 
        path={'/users'}
        render={props => <UsersList {...props} usersList={usersList}/>}
      />
    </Router>
    </div>
  );
}

export default App;