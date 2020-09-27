
import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Nav from "./components/Nav";

import {ContextProvider} from "./context/GlobalContext";
import PrivateRoute from "./utils/PrivateRoute"
import AuthForm from "./components/AuthForm"
import Dashboard from "./components/Dashboard"
import Login from './components/Login'
import SignUp from './components/SignUp'



function App() {
   //moved to global context
  // const [howtos, setHowtos] = useState([]);
  // // const[users,setUsers] = useState([])
  // const [loggedIn, setLoggedIn] = useState(localStorage.getItem("token") ? true : false);
  return (
    <ContextProvider>
      <div className="App">
        <Nav />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />

        <Route exact path='/' component={Login}/>

        <Route path='/signup' component={SignUp}/>
       


        
      </div>
    </ContextProvider>
  );
}

export default App;