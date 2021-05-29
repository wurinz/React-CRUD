import { useEffect, useState } from 'react';
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
    <>
      <UsersList usersList={usersList}/>
      <button onClick={() => setshowRegistration(!showRegistration)}>{!showRegistration ? "ADD USER" : "CLOSE"}</button>
      {showRegistration ? <Registration usersList={usersList}/> : null}
      <Login usersList={usersList}/>
    </>
  );
}

export default App;