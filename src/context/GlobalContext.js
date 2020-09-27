import React, { createContext,useState } from "react";

export const GlobalContext = createContext();


export const ContextProvider = (props) =>{
    const [howtos, setHowTos] = useState([]);
    // const[users,setUsers] = useState([])
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem("token") ? true : false);;
    return(
         <GlobalContext.Provider value={{howtos, setHowTos, loggedIn, setLoggedIn}}>
             {props.children}
         </GlobalContext.Provider> 
    );

}