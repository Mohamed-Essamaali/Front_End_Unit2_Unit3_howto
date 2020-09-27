import React from "react";
import {Link} from "react-router-dom";
import {GlobalContext} from  "../context/GlobalContext";

export default function Navigation() {
    const {loggedIn, setLoggedIn} = React.useContext(GlobalContext);


    const logout = _ => {
        localStorage.removeItem("token");
        setLoggedIn(false);
    }

    return (
        <div className= 'navs'>
             <a  className='navs' href = 'https://pedantic-lumiere-ff8f56.netlify.app/#'>Home</a>
            <Link className='navs' to="/dashboard">Dashboard</Link>
            {loggedIn 
            ? <Link className='navs' to = "/dashboard" onClick={logout}>Log Out</Link>
            : <>
            <Link className='navs' to="/">Log In</Link>
            <Link className='navs' to="/signup">Sign Up</Link>
          
            </>}
            
            
        </div>
    )
}

