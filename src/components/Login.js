import React, { useState,useEffect } from "react";
import axios from "axios";
import *as yup from 'yup'
import { GlobalContext } from "../context/GlobalContext";
import styled from 'styled-components'

const Group = styled.div`
display:flex;
flex-direction:column;
padding:1% 0;
width:25%;`


export default function AuthForm({ role, history }) {
  const { setLoggedIn } = React.useContext(GlobalContext);

  const [authInfo, setAuthInfo] = useState({
    username: "",
    password: "",
  });


  const[disabledButton,setDisabledButton] = useState(true)

  const[errors,setErrors] = useState({

    username:'',
    password:'',

})

const logFormSchema = yup.object().shape({
    username: yup.string().required('must enter user name'),
    password: yup.string().required('must enter password')
})

const validate = e=>{
  yup
  .reach(logFormSchema,e.target.name)
  .validate(e.target.value)
  .then(valid=>{
    setErrors({...errors,[e.target.name]:''}) //if data is valid clear the error message
  })
  .catch(err=>{setErrors({...errors,[e.target.name]:err.errors[0]})})

}

useEffect(()=>{
  logFormSchema
  .isValid(authInfo)
  .then(valid=>{
    setDisabledButton(!valid)
  })

},[authInfo])


  const handleChange = (e) => {

    e.persist();

    setAuthInfo({
      ...authInfo,
      [e.target.name]: e.target.value
    });
    validate(e)
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(

        `https://joses-how-to-api.herokuapp.com/api/auth/login`,

        authInfo
      )
      .then((res) => {
        console.log(res);
        setLoggedIn(true);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id", res.data.id)
        history.push("/Dashboard");
      })
      .catch((err) => console.log(err.message));
  };

  return (

    <div className="auth-page form-container">

  
      <h1>Please Login</h1>
      <form onSubmit={handleSubmit}>

        <Group>
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            id="userName"
            name="username"
            value={authInfo.username}
            onChange={handleChange}
          />
           {errors.username.length>0?<p className= 'error'>{errors.username}</p>:null}

        </Group>
        <Group>
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            name="password"

            value={authInfo.password}
            onChange={handleChange}
          />
          {errors.password.length>0?<p className= 'error'>{errors.password}</p>:null}
        </Group>

        <button disabled={disabledButton} type="submit">Submit</button>
      </form>
    </div>
  );
}